const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD TITLE',
    columns = [new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
