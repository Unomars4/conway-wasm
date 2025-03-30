mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: String);
}

#[wasm_bindgen]
pub fn greet(name: String) {
    alert(format!("Hello 👋, {}", name));
}
