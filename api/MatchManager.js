

const db = require('./Database');

const Match = db.Match;
const Game = db.Game;

class MatchManager {

  constructor() { }

  addMatch({
    player1,
    player2,
    games,
    date
  }) {
    const match = new Match();
    match.date = date;
    match.player1 = player1;
    match.player2 = player2;
    games.forEach(game => {
      const newGame = new Game();
      newGame.player1 = game.player1;
      newGame.player2 = game.player2;
      match.games.push(newGame);
    });

    return new Promise((resolve, reject) => {
      match.save((err, result) => err ? reject(err) : resolve(match));
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      Match.findById(id, (err, match) => err ? reject(err) : resolve(match));
    });
  }

  deleteMatch(match) {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  getAll() {
    return new Promise((resolve, reject) => {
      Match.find({}, (err, matches) => err ? reject(err) : resolve(matches));
    });
  }
}

module.exports = MatchManager;