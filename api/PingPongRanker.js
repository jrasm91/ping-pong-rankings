
const PlayerManager = require('./PlayerManager'),
  MatchManager = require('./MatchManager'),
  config = require('./Config'),
  Utility = require('./Utility'),
  db = require('./Database'),
  Player = db.Player,
  Match = db.Match,
  mongoose = require('mongoose');


class PingPongRanker {
  constructor() {
    this.playerManager = new PlayerManager();
    this.matchManager = new MatchManager();

    // const player1 = new db.Player();
    // player1.name = 'Jason Rasmussen';
    // player1.save();


    // const player2 = new db.Player();
    // player2.name = 'Cassie Rasmussen';
    // player2.save();

    // const match1 = new db.Match();
    // match1.player1 = player1.id;
    // match1.palyer2 = player2.id;
    // match1.save();

    // this.matchManager.addMatch({
    //   player1: player1.id,
    //   player2: player2.id,
    //   games: [{ player1: 21, player2: 9 }, { player1: 21, player2: 11 }, { player1: 21, player2: 18 }],
    //   upset: false,
    //   date: new Date()
    // });

    // this.matchManager.addMatch({
    //   player1: player1.id,
    //   player2: player2.id,
    //   games: [{ player1: 21, player2: 9 }, { player1: 21, player2: 11 }, { player1: 21, player2: 18 }],
    //   date: new Date("2017-05-16T01:43:09.573Z")
    // });

    // this.matchManager.addMatch({
    //   player1: player1.id,
    //   player2: player2.id,
    //   games: [{ player1: 21, player2: 9 }, { player1: 21, player2: 11 }, { player1: 21, player2: 18 }],
    //   date: new Date()
    // });

    // this.matchManager.addMatch({
    //   player1: player1.id,
    //   player2: player2.id,
    //   games: [{ player1: 21, player2:getMatches 9 }, { player1: 21, player2: 11 }, { player1: 21, player2: 18 }],
    //   date: new Date()
    // });

    // this.updateRankings();
  }

  getPlayers() {
    return this.playerManager.getAll();
    // const players = this.playerManager.getAll();
    // players.sort((a, b) => {
    //   return b.score - a.score;
    // });
  }

  getPlayerById(id) {
    return this.playerManager.getById(id);
  }

  addPlayer(player) {
    return this.playerManager.addPlayer(player);
  }

  updatePlayer(id, player) {
    if (player.id !== id) {
      throw new Error('error-player-id-mismatch');
    }
    return playerManager.updatePlayer(id, player);
  }

  removePlayerById(player) {
    return this.player.getById(player.id).then(player => {
      return this.playerManager.removePlayer(req.params.id);
    });
  }

  getMatches() {
    return this.matchManager.getAll();
  Z}

  getMatchById(id) {
    return this.matchManager.getById(id);
  }

  addMatch(match) {
    return this.matchManager.addMatch(match);
  }

  removeMatchById(id) {
    return this.matchManager.removeMatchById(id);
  }

  updateRankings() {
    // const players = this.playerManager.getAll();

    // players.forEach(player => {
    //   player.score = config.DEFAULT_SCORE;
    // });

    // const matches = this.matchManager.getAll();
    // matches.sort((a, b) => {
    //   return new Date(b.date) - new Date(a.date);
    // });

    // matches.forEach(match => {
    //   this.processMatch(match);
    // });
  }

  processMatch(match) {

    match.pointsExchanged = points;
    match.upset = upset;
  }
}

module.exports = PingPongRanker;