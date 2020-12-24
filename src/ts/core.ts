import { Circuit } from "./circuit.js";
import { Nand } from "./gfx/gate/nand.js";

new Nand(250, 250);
new Nand(250, 550);
new Nand(750, 375);

const circuit = new Circuit();
circuit.start();
