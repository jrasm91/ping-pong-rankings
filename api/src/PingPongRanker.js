
const PlayerManager = require('./PlayerManager'),
  MatchManager = require('./MatchManager'),
  Match = require('./Match');


class PingPongRanker {
  constructor() {
    this.playerManager = new PlayerManager();
    this.matchManager = new MatchManager();


    const player1 = this.addPlayer({
      id: 'Jason R.',
      name: 'Jason Rasmussen'
    });

    const player2 = this.addPlayer({
      id: 'Cassie R.',
      name: 'Cassie Rasmussen'
    });

    this.matchManager.addMatch({
      player1: player1.id,
      player2: player2.id,
      score: [[21, 9], [21, 11], [21, 18]],
      upset: false,
      date: new Date()
    });

    this.matchManager.addMatch({
      player1: player1.id,
      player2: player2.id,
      score: [[21, 9], [21, 11], [21, 18]],
      date: new Date()
    });

    this.matchManager.addMatch({
      player1: player1.id,
      player2: player2.id,
      score: [[21, 9], [10, 21], [21, 18]],
      date: new Date()
    });

    this.matchManager.addMatch({
      player1: player1.id,
      player2: player2.id,
      score: [[9, 21], [11, 21], [18, 21]],
      date: new Date()
    });
  }

  getPlayers() {
    const players = this.playerManager.getAll();
    players.forEach(player => this.computeOnPlayer(player));
    return players;
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

  getMatches() {
    const matches = this.matchManager.getAll();
    matches.forEach(match => this.computeOnMatch(match));
    return matches;
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

  getPlayerById(id) {
    const player = this.playerManager.getById(id);
    if (player) {
      this.computeOnPlayer(player);
      return player;
    }
    return null;
  }

  addPlayer(player) {
    player = this.playerManager.addPlayer(player);
    return this.getPlayerById(player.id);
  }

  updatePlayer(id, player) {
    if (player.id !== id) {
      return false;
    }
    return playerManager.updatePlayer(id, player);
  }

  removePlayerById(player) {
    const oldPlayer = playerManager.getById(req.params.id);
    const newPlayer = req.body;
    res.send(playerManager.updatePlayer(oldPlayer, newPlayer));
    this.playerManager.removePlayer(player);
  }

  getMatchById(id) {
    return this.matchManager.getById(id);
  }

  addMatch(match) {
    return this.matchManager.addMatch(match);
  }

  removeMatchById(id) {
    return this.matchManager.removeMatchById(id);
  }
}

module.exports = PingPongRanker;