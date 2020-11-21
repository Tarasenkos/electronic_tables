export function shouldResize() {
  // event подтягивается из родительской функции (замыкание)
  return event.target.dataset.resize
}

export function isCell() {
  return event.target.dataset.type === 'cell'
}

export function moveDown({root, selection, current}) {
  event.preventDefault()
  const $target = root.find(`[data-id="${current.col}:${current.row+1}"]`)
  return select($target, selection)
}

export function moveUp({root, selection, current}) {
  const $target = root.find(`[data-id="${current.col}:${current.row-1}"]`)
  return select($target, selection)
}

export function moveRight({root, selection, current}) {
  event.preventDefault()
  const $target = root.find(`[data-id="${current.col+1}:${current.row}"]`)
  return select($target, selection)
}

export function moveLeft({root, selection, current}) {
  event.preventDefault()
  const $target = root.find(`[data-id="${current.col-1}:${current.row}"]`)
  return select($target, selection)
}

export function select($target, selection) {
  if ($target.$el) {
    selection.selectCell($target)
    return $target
  }
}

// export function selectTarget($target, selection) {
//   if ($target.$el) {
//     selection.selectCell($target)
//   }
// }

// export function getTarget(keyPressed, current) {
//   let col = current.col
//   let row = current.row

//   switch (keyPressed) {
//     case 'ArrowDown': row++
//       break
//     case 'Enter': row++
//       break
//     case 'ArrowUp': row--
//       break
//     case 'ArrowLeft': col--
//       break
//     case 'ArrowRight':
//     case 'Tab': col++
//       break
//   }
//   return `[data-id="${col}:${row}"]`
// }
