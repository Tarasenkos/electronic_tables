class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' // Значит это id dom элемента
      ? document.querySelector(selector) // Выбираем элемент по селектору в id
      : selector;
  }

  html(text) {
    if (typeof text === 'string') {
      this.$el.innerHTML = text
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    this.$el.textContent = text
  }

  get tex() {
    return this.$el.textContent
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  on(eventName, callBack) {
    this.$el.addEventListener(eventName, callBack)
  }

  off(eventName, callBack) {
    this.$el.removeEventListener(eventName, callBack)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  selectAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  focus() {
    return $(this.$el.focus())
  }

  addClass(className) {
    return this.$el.classList.add(className)
  }

  removeClass(className) {
    return this.$el.classList.remove(className)
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        col: +parsed[0],
        row: +parsed[1],
      }
    }
    return this.data.id
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key)=>{
      this.$el.style[key] = styles[key]
    })
  }
}


$.create = (tagName, classes = '') => {
  const element = document.createElement(tagName)

  if (classes) {
    classes.split(' ').map((className) => element.classList.add(className))
  }
  return $(element)
}

export function $(selector) {
  return new Dom(selector)
}
