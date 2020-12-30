import { Cable } from "../gfx/cable/cable";
import { BaseNode } from "../gfx/node/base-node";
import { getPosition } from "../gfx/util/position";
import { LayerType } from "../layer/layer-manager";
import { Position } from "../type/types";
import { Handler } from "./handler";

const RIGHT_CLICK = 2;

export class CableHandler extends Handler {
  private _currentCable: Cable = null;
  private _isDragging: boolean = false;
  private _isMouseDown: boolean = false;
  private _isSplitMode = false;

  public onMouseMove(event: MouseEvent): void {
    if (this._isMouseDown) this._isDragging = true;
    else this._isDragging = false;

    if (this._isDragging || this._isSplitMode) {
      // Here, the endPoint isn't exactly the 'endPoint'. 
      // It is the next endpoint of the splitted cable.
      this._currentCable.endPoint = getPosition(event);
    }
  }

  public onMouseDown(event: MouseEvent): void {
    if (event.button === RIGHT_CLICK) return;

    if (!this._isSplitMode) this._handleMouseDown(event);
    else this._handleMouseDownSplitMode(event);
  }

  private _handleMouseDown(event: MouseEvent): void {
    this._isMouseDown = true;
    this._currentCable = new Cable(getPosition(event), null);
    this._layer.addDrawable(this._currentCable);
  }

  private _handleMouseDownSplitMode(event: MouseEvent): void {
    const node = this._getDrawableFromPoint(getPosition(event));
    // When the node isn't null, we allow the user to connect the next node (if any).
    if (node !== null) {
      this._currentCable.endSplitPoint(node.position);
      return;
    }

    // These actions happen when the user doesn't click on a node.
    // Thus we can end the splitMode.
    this._isSplitMode = false;
    this._currentCable.done();
  }

  public onMouseUp(event: MouseEvent): void {
    this._isMouseDown = false;
    this._isDragging = false;

    // We only want to finalize the cable drawing when both of these
    // conditions are met.
    if (this._currentCable !== null && !this._isSplitMode) {
      if (!this._currentCable.isSplit) {
      // This method should only be used when the cable isn't split.
        this._correctCablePosition(event);
      } else {
        // The cable is split, correct multiple positions.
        this._correctCablePositions();
      }
    }
  }

  private _correctCablePosition(event: MouseEvent): void {
    this._currentCable.endPoint = getPosition(event);
    const beginNode = this._getDrawableFromPoint(this._currentCable.beginPoint);
    const endNode = this._getDrawableFromPoint(this._currentCable.endPoint);

    // This prevents cables from existing on their own.
    if (beginNode === null || endNode === null) {
      this._layer.removeLastDrawable();
      this._currentCable = null;
      return;
    }

    this._currentCable.beginPoint = beginNode.position;
    this._currentCable.endPoint = endNode.position;
    this._currentCable.setUpLogic(beginNode, [endNode]);
  }

  private _correctCablePositions(): void {
    // Grab all the nodes corresponding to the splitted cable positions.
    const nodes = this._currentCable.splitPoints.map(point => this._getDrawableFromPoint(point));

    // Here we take the mouse click positions of the splitted cable 
    // and correct them with the proper positions.
    this._currentCable.splitPoints = nodes.map(node => node.position);

    // Here we do the same, but only for the beginPoint. 
    // We don't do it for the endPoints, since it isn't considered an endPoint anymore.
    // We consider it as an intermediary point instead.
    const beginNode = this._getDrawableFromPoint(this._currentCable.beginPoint);
    this._currentCable.beginPoint = beginNode.position;

    if (this._currentCable.splitPoints.length === 0) {
      // If the cable has been split, but doesn't contain any splitPoints, we can remove it since
      // the end user has not drawn any splitted cables.
      this._layer.removeLastDrawable();
    } else {
      // Otherwise, setup internal cable logic
      this._currentCable.setUpLogic(beginNode, nodes);
    } 

    this._currentCable = null;
  }

  public onMouseButtonRight(event: MouseEvent): void {
    if (this._currentCable === null || this._isSplitMode) return;

    this._isSplitMode = true;
    this._currentCable.split(getPosition(event));
  }

  private _getDrawableFromPoint(position: Position): BaseNode {
    for (let drawable of this._layer.manager.getDrawablesByLayer(LayerType.Draw)) {
      if (drawable.pointInArea(position.x, position.y)) {
        return <BaseNode>drawable.drawableInPoint(position);
      }
    }
    return null;
  }
}
