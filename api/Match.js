class Match {
  constructor({
    id,
    player1,
    player2,
    games,
    date
  }) {
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
    this.games = games;
    this.date = date;

    const results = this.calcResults();
    this.winner = results.winner;
    this.loser = results.loser;
  }

  calcResults() {
    let wins = 0
    this.games.forEach(game => {
      wins += game.player1 > game.player2 ? 1 : -1
    });
    return {
      winner: wins >= 0 ? this.player1 : this.player2,
      loser: wins >= 0 ? this.player2 : this.player1
    }
  }
}

class Game {
  constructor(points1, points2) {
    this.player1 = points1;
    this.player2 = points2;
  }
}

Match.Game = Game;

module.exports = Match;