const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD TITLE',
    columns = [
      {
        title: 'TASK TITLE',
        order: 0
      }
    ]
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
