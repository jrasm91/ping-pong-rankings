

const uuid = require('uuid/v4');

const Match = require('./Match.js');

class MatchManager {

  constructor() {
    this.matches = [];
  }

  addMatch({
    player1,
    player2,
    games,
    date
  }) {

    const match = new Match({
      id: uuid(),
      date,
      player1,
      player2,
      games: games.map((game) => {
        return new Match.Game(game.player1, game.player2)
      })
    });
    this.matches.push(match);
    return match;
  }

  getById(id) {
    return this.matches.filter(match => match.id === id)[0] || {};
  }

  deleteMatch(match) {
    match = this.getById(match.id);
    if (match) {
      this.matches = this.matches.filter(m => m.id !== match.id);
      return true;
    }
    return false;
  }

  getAll() {
    return this.matches;
  }
}

module.exports = MatchManager;