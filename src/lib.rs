mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

impl Universe {
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.width {
            for col in 0..self.height {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbours = self.live_neighbour_count(row, col);

                let next_cell = match (cell, live_neighbours) {
                    // Death by Isolation
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    // Just right
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    // Death by Overpopulation/Competition
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    // New cell created by reproduction
                    (Cell::Dead, 3) => Cell::Alive,
                    // Stays the same
                    (otherwise, _) => otherwise,
                };

                next[idx] = next_cell;
            }
        }

        self.cells = next;
    }

    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn live_neighbour_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for change_in_row in [self.height - 1, 0, 1].iter().cloned() {
            for change_in_col in [self.width - 1, 0, 1].iter().cloned() {
                if change_in_row == 0 && change_in_col == 0 {
                    continue;
                }

                let neighbour_row = (row + change_in_row) % self.height;
                let neighbour_col = (column + change_in_col) % self.width;
                let idx = self.get_index(neighbour_row, neighbour_col);
                count += self.cells[idx] as u8;
            }
        }
        count
    }
}
