class Match {
  constructor({
    id,
    player1,
    player2,
    score,
    date
  }) {
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
    this.score = score;
    this.date = date;

    const results = this.calcResults();
    this.winner = results.winner;
    this.loser = results.loser;
  }

  calcResults() {
    let wins = 0
    this.score.forEach(game => {
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