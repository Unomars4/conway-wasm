import "./style.css";
import { Universe } from "conway-wasm";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Conways Game of Life</h1>
    <div class="form">
      <canvas id="game-of-life-canvas"></canvas> 
    </div>
  </div>
`;

const stringCanvas = document.querySelector<HTMLPreElement>(
  "#game-of-life-canvas",
)!;
const universe = Universe.new();

const loopy = () => {
  stringCanvas.textContent = universe.render();
  console.log("universe:", universe.render());
  universe.tick();

  requestAnimationFrame(loopy);
};

requestAnimationFrame(loopy);
