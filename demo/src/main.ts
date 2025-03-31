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

const CELL_SIZE = 5,
  GRID_COLOR = "#fffff",
  DEAD_COLOR = "#fffff",
  ALIVE_COLOR = "#242424";

const universe = Universe.new(),
  width = universe.width(),
  height = universe.height();

const Canvas = document.querySelector<HTMLCanvasElement>(
  "#game-of-life-canvas",
)!;

const loopy = () => {
  universe.tick();

  requestAnimationFrame(loopy);
};

requestAnimationFrame(loopy);
