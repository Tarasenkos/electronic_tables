export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  selectCell($el) {
    if ($el) {
      this.clearSelection()
      this.select($el)
      $el.focus()
      this.current = $el
    }
  }

  selectGroup(matrix = []) {
    this.clearSelection()
    matrix.forEach(($el)=>this.select($el))
  }

  clearSelection() {
    this.group.map(($el) => $el.removeClass(TableSelection.className))
    this.group=[]
  }

  select($el) {
    this.group.push($el)
    $el.addClass(TableSelection.className)
  }
}
