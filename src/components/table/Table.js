import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template'
import {tableResize} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(150)
  }

  onMousedown() {
    if (shouldResize()) {
      tableResize(this.$root)
    }
  }
}
