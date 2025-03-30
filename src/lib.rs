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
    pub fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }
}
