const mongoose = require('mongoose'),
  config = require('./Config'),
  logger = require('./Logger'),
  Utility = require('./Utility');

const connection = mongoose.connect(config.DB_CONNECTION);

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const PlayerSchema = new Schema({
  name: String,
  score: Number,
  wins: Number,
  losses: Number
});

PlayerSchema.pre('save', function (next) {
  if (this.isNew) {
    this.score = config.DEFAULT_SCORE
    this.wins = 0;
    this.losses = 0;
  }
  logger.log('Saving Player');
  next();
});

const Player = mongoose.model('Player', PlayerSchema);

const GameSchema = new Schema({
  player1: Number,
  player2: Number
});
const Game = mongoose.model('Game', GameSchema);

const MatchSchema = new Schema({
  id: ObjectId,
  player1: String,
  player2: String,

  winnerId: String,
  winnerName: String,
  winnerScore: Number,

  loserId: String,
  loserName: String,
  loserScore: Number,

  upset: Boolean,
  pointsExchanged: Number,
  games: [GameSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

const Match = mongoose.model('Match', MatchSchema);

const setWinner = function (next) {
  if (this.isNew) {
    logger.log('Saving Match');
    let wins = this.games.filter(game => game.player1 > game.player2).length;
    this.winnerId = wins >= 0 ? this.player1 : this.player2;
    this.loserId = wins >= 0 ? this.player2 : this.player1

    logger.info(`Match.winnerId`, this.winnerId);
    logger.info(`Match.loserId`, this.loserId);
  }
  next();
};

const updatePlayers = function (next) {
  Player.find({
    '_id': {
      $in: [
        mongoose.Types.ObjectId(this.winnerId),
        mongoose.Types.ObjectId(this.loserId)
      ]
    }
  }, (err, players) => {
    if (err) {
      return logger.error('Error updating player scores', err);
    }
    const winner = players[0]._id == this.winnerId ? players[0] : players[1];
    const loser = players[0]._id == this.loserId ? players[0] : players[1];

    const upset = loser.score > winner.score;
    const pointsExchanged = Utility.findRankingChanges(winner.score, loser.score, upset);

    this.upset = upset;
    this.pointsExchanged = pointsExchanged;

    this.winnerScore = winner.score;
    this.winnerName = winner.name;
    winner.score += pointsExchanged;
    winner.wins += 1;

    this.loserScore = loser.score;
    this.loserName = loser.name;
    loser.score -= pointsExchanged;
    loser.losses += 1;

    winner.save((err, data) => {
      if (err) {
        logger.error('Error Updating Player', err);
      }
    });
    loser.save((err, data) => {
      if (err) {
        logger.error('Error Updating Player', err);
      }
    });

    next();
  });
}

MatchSchema.pre('save', setWinner);
MatchSchema.pre('save', updatePlayers);

module.exports = {
  connection,
  Player,
  Match,
  Game
}
