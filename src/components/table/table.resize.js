import {$} from '@/core/dom'

export function tableResize($root) {
  const resizable = event.target.dataset.resize

  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const colIndex = $parent.data.index
  const coords = $parent.getCoords()
  // console.log($resizer.$el)

  if (resizable === 'col') {
    const cells = $root.selectAll(`[data-index=${colIndex}]`);
    cells.forEach((el)=>el.classList.add('col-resize-line'))
    let delta;
    let value;
    let deltaX;

    document.onmousemove = (e) => {
      delta = e.pageX - coords.right
      value = coords.width + delta
      if (value > 20) {
        deltaX = delta
      } else {
        value = 20
      }
      $parent.$el.style.width = coords.width + deltaX + 'px';
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
