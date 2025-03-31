import "./style.css";
import { memory } from "conway-wasm/conway_wasm_bg";
import { Cell, Universe } from "conway-wasm";

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

const drawGrid = () => {
  if (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    //Set Vertical lines
    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    //Set Horizontal lines
    for (let j = 0; j <= height; j++) {
      ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
      ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
  }
};

const getIndex = (row: number, column: number): number => {
  return row * width + column;
};

const drawCells = () => {
  if (ctx) {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col);

        ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;
        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE,
        );
      }
    }
    ctx.stroke();
  }
};

const loopy = () => {
  universe.tick();

  drawGrid();
  drawCells();

  requestAnimationFrame(loopy);
};

requestAnimationFrame(loopy);
