

const config = require('./Config.js');

class Player {
  constructor({
    id,
    name
  }) {
    this.id = id;
    this.name = name
    this.score = config.DEFAULT_SCORE
  }
}

module.exports = Player;