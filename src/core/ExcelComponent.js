import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare()
    this.emitter = options.emitter
    this.unsubscribe = []
  }

  prepare() {
  }

  // Возвращает шаблон
  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribe.push(unsub)
  }

  // Добавляет слушатели
  init() {
    this.initDOMListeners()
  }
  // Убирает слушатели
  destroy() {
    console.log('Destroyed')
    this.removeDOMListeners()
    this.unsubscribe.forEach((unsub) => unsub())
  }
}
