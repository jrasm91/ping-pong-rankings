const mongoose = require('mongoose'),
  config = require('./Config'),
  logger = require('./Logger');

const connection = mongoose.connect(config.DB_CONNECTION);

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const PlayerSchema = new Schema({
  id: ObjectId,
  name: String,
  score: Number
});

PlayerSchema.pre('save', function (next) {
  if (this.isNew) {
    this.score = config.DEFAULT_SCORE
  }
  logger.log('Saving Player', this);
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
  winner: String,
  loser: String,
  games: [GameSchema],
  date: Date
});

const Match = mongoose.model('Match', MatchSchema);

MatchSchema.pre('save', function (next) {
  console.log(this);
  if (this.isNew) {
    logger.log('Saving Match');
    let wins = this.games.filter(game => game.player1 > game.player2).length;
    this.winner = wins >= 0 ? this.player1 : this.player2;
    this.loser = wins >= 0 ? this.player2 : this.player1
  }
  next();
});

module.exports = {
  connection,
  Player,
  Match,
  Game
}
