//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use std::assert_eq;

use wasm_bindgen_test::*;
wasm_bindgen_test_configure!(run_in_browser);

fn main() {
    extern crate conway_wasm;
    use conway_wasm::Universe;

    #[cfg(test)]
    pub fn input_spaceship() -> Universe {
        let mut universe = Universe::new();
        universe.set_width(6);
        universe.set_height(6);
        universe.set_cells(&[(1, 2), (2, 3), (3, 1), (3, 2), (3, 3)]);
        universe
    }

    #[cfg(test)]
    pub fn expected_spaceship() -> Universe {
        let mut universe = Universe::new();
        universe.set_width(6);
        universe.set_height(6);
        universe.set_cells(&[(2, 1), (2, 3), (3, 2), (3, 3), (4, 2)]);
        universe
    }

    #[wasm_bindgen_test]
    pub fn test_tick() {
        let mut input_universe = input_spaceship();
        let expected_universe = expected_spaceship();

        input_universe.tick();
        assert_eq!(&input_universe.get_cells(), &expected_universe.get_cells());
    }
}
