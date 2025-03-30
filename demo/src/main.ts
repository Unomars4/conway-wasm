import "./style.css";
import * as wasm from "conway-wasm";
import { setupCounter } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Conways Game of Life</h1>
    <canvas/> 
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
