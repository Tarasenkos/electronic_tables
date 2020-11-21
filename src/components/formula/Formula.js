import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    })
  }

  init() {
    super.init()
    this.formula = this.$root.find('#formula').$el
    this.$on('table:cell', (text) => this.formula.textContent = text)
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" 
      contenteditable="true" spellcheck="false"></div>
    `
  }

  onInput(event) {
    const text = event.target.textContent.trim()
    this.$emit('formula:input', text)
  }

  onClick() {
    console.log('Click')
  }

  onKeydown() {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('formula:keyEnter')
    }
  }
}
