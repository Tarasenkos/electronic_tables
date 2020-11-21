import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template'
import {tableResize} from './table.resize';
import {shouldResize, isCell, moveDown, moveUp,
  moveRight, moveLeft} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import {matrix} from '../../core/utils';


export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable(150)
  }

  prepare() {
    this.selection = new TableSelection
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="1:1"]')
    this.selection.selectCell($cell)

    this.$on('formula:input', (text)=>{
      this.selection.current.text(text)
    })

    this.$on('formula:keyEnter', () => {
      this.selection.current.focus()
    })
  }

  onMousedown() {
    const $target = $(event.target)
    if ($target.data.type === 'cell') {
      this.$emit('table:cell', $target.tex)
    }
    if (shouldResize()) {
      tableResize(this.$root)
    } else if (isCell()) {
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id)=>this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selection.selectCell($target)
      }
    }
  }
  onInput() {
    const $target = $(event.target)
    this.$emit('table:cell', $target.tex)
  }

  onKeydown() {
    const options = {
      root: this.$root,
      selection: this.selection,
      current: this.selection.current.id(true),
    }

    const keyPressed = event.key
    const key = [
      'ArrowDown', 'ArrowUp',
      'ArrowRight', 'ArrowLeft',
      'Enter', 'Tab',
    ]

    let $target
    if (key.includes(keyPressed)) {
      if (event.key==='ArrowDown') $target = moveDown(options)
      if (event.key==='ArrowUp') $target = moveUp(options)
      if (event.key==='ArrowRight') $target = moveRight(options)
      if (event.key==='ArrowLeft') $target = moveLeft(options)
      if (event.key==='Enter') {
        !event.shiftKey ? (
        $target = moveDown(options)
       ) : null
      }

      if (event.key==='Tab') {
        !event.shiftKey
          ? $target = moveRight(options)
          : $target = moveLeft(options)
      }

      this.$emit('table:cell', $target.tex)
    }


    // const current = this.selection.current.id(true)
    // if (key.includes(keyPressed)) {
    //   !event.shiftKey ? event.preventDefault() : null
    //   const $target = this.$root.find(getTarget(keyPressed, current))
    //   selectTarget($target, this.selection)
    // }
  }
}
