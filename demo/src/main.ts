import "./style.css";
import { setupAlert } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Conways Game of Life</h1>
    <div class="form">
      <input id="input" type="text" placeholder="Enter your name 🚓">
      <button id="alert-btn">Alert 🚨</button>
    </div>
    <canvas/> 
  </div>
`;

let value;
const inputEl = document.querySelector<HTMLInputElement>("#input")!;
inputEl.addEventListener("change", (e: Event) => {
  const target = e.target as HTMLInputElement;
  value = String(target.value);
  setupAlert(document.querySelector<HTMLButtonElement>("#alert-btn")!, value);
});
