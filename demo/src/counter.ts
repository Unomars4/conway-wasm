import * as wasm from "conway-wasm";

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}

export function setupAlert(element: HTMLButtonElement) {
  element.addEventListener("click", () => wasm.greet());
}
