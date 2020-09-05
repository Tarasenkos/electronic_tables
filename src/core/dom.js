class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' // Значит элемент уже отрисован
      ? document.querySelector(selector) // Выбираем его по селектору в id
      : selector; // Присваиваем данные из метода create

    // console.log('Дом элемент', this.$el)
  }

  html(text) {
    if (typeof text === 'string') {
      this.$el.innerHTML = text
      return this
    }
    return this.$el.outerHTML.trim()
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
