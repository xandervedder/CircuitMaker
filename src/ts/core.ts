import { Circuit } from "./circuit.js";
import { NAND } from "./gate/nand.js";

new NAND(250, 250);
new NAND(250, 550);
new NAND(750, 375);

const circuit = new Circuit();
circuit.start();
