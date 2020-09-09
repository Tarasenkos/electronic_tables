import {$} from '@/core/dom'

export function tableResize(event, $root) {
  const resizable = event.target.dataset.resize

  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const colIndex = $parent.data.index
  const coords = $parent.getCoords()
  console.log($resizer.$el)

  if (resizable === 'col') {
    const cells = $root.selectAll(`[data-index=${colIndex}]`);
    cells.forEach((el)=>el.classList.add('col-resize-line'))
    let delta;
    let value;
    document.onmousemove = (e) => {
      let deltaX;
      delta = coords.right - e.pageX
      value = coords.width - delta
      if (value >40) {
        deltaX = delta
      } else {
        value = 40
      }
      $resizer.$el.style.right = deltaX + 'px';
    }

    document.onmouseup = () => {
      document.onmousemove = null
      cells.forEach((el)=>$(el).css({width: value + 'px'}))
      cells.forEach((el)=>el.classList.remove('col-resize-line'))
      $resizer.css({right: -2 + 'px'})
      document.onmouseup = null
    }
  }

  if (resizable === 'row') {
    document.onmousemove = (e) => {
      const delta = e.clientY - coords.bottom
      const value = coords.height + delta
      $parent.css({height: value + 'px'})
    }
    document.onmouseup = () => {
      document.onmousemove = null
    }
  }
}
