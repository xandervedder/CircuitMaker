import { LayerType, LayerManager } from "./layer/layer-manager";
import { $, all } from "./ui/dom";

const version = "v0.0";
document.title = `CircuitMaker - ${version}`;

const manager = new LayerManager();
manager.switchActiveLayer(LayerType.Preview);

const toastElement = $("#toast");
const toastTextElement = $("#toastText");

const toolbox = $("#toolbox");
const toolboxButton = $("#toolboxButton");
toolboxButton.addEventListener("click", () => {
  toolbox.classList.toggle("toolbox--open");
});

const tools = [...all("#gates .toolbox__button"), ...all("#placement .toolbox__button"), ...all("#nodes .toolbox__button")];
tools.forEach(tool => {
  tool.addEventListener("click", () => {
    tools.forEach(_tool => _tool.classList.remove("toolbox__button--toggled"));
    tool.classList.add("toolbox__button--toggled");
  });
})

const layerTools = all("#layers .toolbox__button");
layerTools.forEach(tool => {
  tool.addEventListener("click", () => {
    layerTools.forEach(_tool => _tool.classList.remove("toolbox__button--toggled"));
    tool.classList.add("toolbox__button--toggled");

    if (tool.id === "preview") {
      toastTextElement.textContent = "Preview";
      manager.switchActiveLayer(LayerType.Preview);
    } else {
      toastTextElement.textContent = "Draw"
      manager.transferDrawables();
      manager.switchActiveLayer(LayerType.Draw);
    }

    showToast();
  });
})

function showToast() {
  toastElement.classList.remove("toast--hide");
  setTimeout(() => {
    toastElement.classList.add("toast--hide");
  }, 1500);
}

showToast();
