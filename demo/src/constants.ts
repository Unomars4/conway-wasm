import { Universe } from "conway-wasm";

export const CELL_SIZE = 5,
  GRID_COLOR = "rgba(255, 255, 255, 0.87)",
  DEAD_COLOR = "#242424",
  ALIVE_COLOR = "rgba(255, 255, 255, 0.87)";

export const universe = Universe.new(),
  width = universe.width(),
  height = universe.height();
