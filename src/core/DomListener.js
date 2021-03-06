import {capitalize} from '@/core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    console.log('This: ', this)
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      // console.log('This is this: ', this)
      if (!this[method]) {
        throw new Error(`Method ${method} is not defined
        for ${this.name || ''} component`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }
  removeDOMListeners() {
    this.listeners.forEach( (listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not defined
        for ${this.name || ''} component`)
      }
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
