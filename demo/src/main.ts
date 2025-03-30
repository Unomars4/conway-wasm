import "./style.css";
import { setupAlert } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Conways Game of Life</h1>
    <div class="form">
      <input type="text" placeholder="Enter your name 🚓">
      <button id="alert-btn">Alert 🚨</button>
    </div>
    <canvas/> 
  </div>
`;

setupAlert(document.querySelector<HTMLButtonElement>("#alert-btn")!);
