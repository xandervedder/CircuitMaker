import { LayerType, LayerManager } from "./layer/layer-manager";

const manager = new LayerManager();
manager.switchActiveLayer(LayerType.Preview);

const tooltip = document.querySelector("#tooltip");

document.querySelector("#switchLayer").addEventListener("click", () => {
  if (manager.activeLayer === LayerType.Draw) {
    manager.switchActiveLayer(LayerType.Preview);
    tooltip.textContent = "Current layer: Preview";
  } else {
    manager.transferDrawables();
    manager.switchActiveLayer(LayerType.Draw);
    tooltip.textContent = "Current layer: Draw"
  }
});
