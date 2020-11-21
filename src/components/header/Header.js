import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...options,
    })
  }

  toHTML() {
    return `<input class="input" type="text" placeholder="Новая таблица">
    <div>
        <div class="button">
            <span class="material-icons"> delete_outline</span>
        </div>
        
        <div class="button">
            <span class="material-icons">close</span>
        </div>
    </div>`
  }
}
