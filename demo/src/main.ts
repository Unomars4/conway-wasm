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

const canvas = document.querySelector<HTMLCanvasElement>(
  "#game-of-life-canvas",
)!;
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext("2d");

const loopy = () => {
  universe.tick();

  requestAnimationFrame(loopy);
};

requestAnimationFrame(loopy);
