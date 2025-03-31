import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Conways Game of Life</h1>
    <div class="form">
      <pre id="game-of-life-canvas"></pre> 
    </div>
    <canvas/> 
  </div>
`;

let value;
const inputEl = document.querySelector<HTMLInputElement>("#input")!;
inputEl.addEventListener("change", (e: Event) => {
  const target = e.target as HTMLInputElement;
  value = String(target.value);
});
