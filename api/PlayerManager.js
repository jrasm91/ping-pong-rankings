
// const Player = require('./Player');
const db = require('./Database');

const Player = db.Player;

const logger = require('./Logger'),
  uuid = require('uuid/v4');

class PlayerManager {

  constructor() { }

  getById(id) {
    return new Promise((resolve, reject) => {
      Player.findById(id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  }

  getByName(name) {
    return new Promise((resolve, reject) => {
      Player.findOne({ name }, (err, player) => {
        if (err) {
          reject(err);
        } else {
          resolve(player);
        }
      });
    });
  }

  addPlayer({
    id,
    name
  }) {
    return new Promise((resolve, reject) => {
      this.getByName(name).then((duplicatePlayer) => {
        if (duplicatePlayer) {
          const error = new Error("error-player-duplicate-name");
          error.playerName = name;
          throw error;
        } else {
          const newPlayer = new Player();
          newPlayer.name = name;
          newPlayer.save((error => {
            if (error) {
              reject(error);
            } else {
              resolve(newPlayer);
            }
          }));
        }
      });
    });
  }

  updatePlayer(id, newPlayer) {
    return new Promise((resolve, reject) => {
      Player.findById(id, (error, player) => {
        if (error) {
          return reject(error);
        }

        if (!player) {
          throw new Error("error-player-not-found");
        }
        Object.assign(player, newPlayer);
        player.save();
        resolve(player);
      });
    });
  }

  deletePlayer(oldPlayer) {
    // const player = this.getById(oldPlayer.id);
    // if (player) {
    //   delete this.players[player.id];
    //   return true;
    // }
    // return false;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      Player.find({}, null, { sort: '-score' }, (error, players) => error ? reject(error) : resolve(players));
    });
  }
}

module.exports = PlayerManager;