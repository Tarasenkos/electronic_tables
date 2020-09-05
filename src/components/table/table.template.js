const Code = {
  A: 65,
  Z: 90,
}
const columns = Code.Z-Code.A+1

function toChar(_, index) {
  return String.fromCharCode(Code.A+index)
}

function createCol(_, index) {
  return `
  <div class="column">
  ${toChar(_, index)}
  <div class="col-resize"></div>
  </div>
  `
}

function toCell() {
  return `
  <div class="cell" contenteditable></div>
  `
}


function createRow(index = '', content='') {
  return `
  <div class="row">
    <div class="row-info">
    ${index}
    ${index ? '<div class="row-resize"></div>' : ''}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `
}

export function createTable(rowsCount = 10) {
  const rows = []

  const tableHead = new Array(columns)
      .fill()
      .map(createCol)
      .join('')

  rows.push(createRow('', tableHead))

  for (let i=1; i<=rowsCount; i++) {
    const cells = new Array(columns)
        .fill()
        .map(toCell)
        .join('')

    rows.push(createRow(i, cells))
  }

  return rows.join('')
}
