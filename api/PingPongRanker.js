
const PlayerManager = require('./PlayerManager'),
  MatchManager = require('./MatchManager'),
  Match = require('./Match'),
  config = require('./Config'),
  Utility = require('./Utility'),
  db = require('./Database');


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
    //   games: [{ player1: 21, player2: 9 }, { player1: 21, player2: 11 }, { player1: 21, player2: 18 }],
    //   date: new Date()
    // });

    // this.updateRankings();
  }

  computeOnPlayer(player) {
    player._wins = 0;
    player._losses = 0;
    player.matches = this.getMatches().filter(match => {
      if (match.winner == player.id) {
        player._wins += 1;
        return true;
      } else if (match.loser == player.id) {
        player._losses += 1;
        return true
      }
      return false;
    });
  }

  computeOnMatch(match) {
    const winner = this.playerManager.getById(match.winner);
    const loser = this.playerManager.getById(match.loser);

    match._winner = {
      id: winner.id,
      name: winner.name,
      score: winner.score
    };
    match._loser = {
      id: loser.id,
      name: loser.name,
      score: loser.score
    };
  }

  getPlayers() {
    return this.playerManager.getAll();
    // const players = this.playerManager.getAll();
    // players.sort((a, b) => {
    //   return b.score - a.score;
    // });
    // players.forEach(player => this.computeOnPlayer(player));
    // return players;
  }

  getPlayerById(id) {
    return this.playerManager.getById(id);
    // const player = this.playerManager.getById(id);
    // if (player) {
    //   this.computeOnPlayer(player);
    //   return player;
    // }
    // return null;
  }

  addPlayer(player) {
    return this.playerManager.addPlayer(player);
    // return this.getPlayerById(player.id);
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
    // matches.forEach(match => this.computeOnMatch(match));
    // return matches;
  }

  getMatchById(id) {
    return this.matchManager.getById(id);
  }

  addMatch(match) {
    return this.matchManager.addMatch(match);
    // this.updateRankings();
    // return result;
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
    const winner = this.getPlayerById(match.winner);
    const loser = this.getPlayerById(match.loser);

    const upset = winner.score < loser.score;
    const points = Utility.findRankingChanges(winner.score, loser.score, upset);

    winner.score += points;
    loser.score -= points;

    match.pointsExchanged = points;
    match.upset = upset;
  }
}

module.exports = PingPongRanker;