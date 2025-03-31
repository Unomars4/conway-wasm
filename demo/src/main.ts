import "./style.css";
import { Cell, Universe } from "conway-wasm";
import { memory } from "conway-wasm/conway_wasm_bg.wasm";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Conways Game of Life</h1>
    <div class="main">
      <button id="play-pause"></button>
      <canvas id="game-of-life-canvas"></canvas> 
    </div>
  </div>
`;

let animationId: null | number = null;
const CELL_SIZE = 5,
  GRID_COLOR = "rgba(255, 255, 255, 0.87)",
  DEAD_COLOR = "#242424",
  ALIVE_COLOR = "rgba(255, 255, 255, 0.87)";

const universe = Universe.new(),
  width = universe.width(),
  height = universe.height();

const playPauseBtn = document.querySelector<HTMLButtonElement>("#play-pause")!;
playPauseBtn.addEventListener("click", () => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});

const canvas = document.querySelector<HTMLCanvasElement>(
  "#game-of-life-canvas",
)!;
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

canvas.addEventListener("click", (event: MouseEvent) => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.right) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawGrid();
  drawCells();
});

const ctx = canvas.getContext("2d");

const play = () => {
  playPauseBtn.textContent = "⏸";
  loopy();
};

const pause = () => {
  playPauseBtn.textContent = "▶";
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
};

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

const isPaused = (): boolean => {
  return animationId == null;
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

  animationId = requestAnimationFrame(loopy);
};

drawGrid();
drawCells();
play();
