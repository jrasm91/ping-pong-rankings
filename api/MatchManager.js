

const db = require('./Database');

const Match = db.Match;
const Game = db.Game;

class MatchManager {

  constructor() { }

  addMatch({
    player1,
    player2,
    games
  }) {
    if (!player1 || !player2) {
      throw new Error("Match is missing a player");
    } else if (player1 === player2) {
      throw new Error("Can't play yourself!");
    }

    const match = new Match({
      player1,
      player2,
      games: games.map(game => {
        return new Game({
          player1: game.player1,
          player2: game.player2
        });
      })
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
      Match.find({}, null, { sort: '-date' }, (err, matches) => err ? reject(err) : resolve(matches));
    });
  }
}

module.exports = MatchManager;