export function shouldResize() {
  // event подтягивается из родительской функции (замыкание)
  return event.target.dataset.resize
}
