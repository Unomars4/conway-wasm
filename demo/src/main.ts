import "./style.css";
import { Universe } from "conway-wasm";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Conways Game of Life</h1>
    <div class="form">
      <pre id="game-of-life-canvas"></pre> 
    </div>
    <canvas/> 
  </div>
`;

const stringCanvas = document.querySelector<HTMLPreElement>(
  "#game-of-life-canvas",
)!;
const universe = Universe.new();

const loopy = () => {
  stringCanvas.textContent = universe.render();
  universe.tick();

  requestAnimationFrame(loopy);
};

requestAnimationFrame(loopy);
