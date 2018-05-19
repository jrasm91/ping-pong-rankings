
const Player = require('./Player');

const logger = require('./Logger'),
  uuid = require('uuid/v4');

class PlayerManager {

  constructor() {
    this.players = {};
  }

  getById(id) {
    return this.players[id];
  }

  getByName(name) {
    return Object.values(this.players).filter(p => p.name === name)[0];
  }

  addPlayer({
    id,
    name
  }) {
    const duplicatePlayer = this.getByName(name);
    if (duplicatePlayer) {
      const error = new Error("error-player-duplicate-name");
      error.playerName = name;
      throw error;
    }
    const player = new Player({
      id: id || uuid(),
      name
    });
    this.players[player.id] = player;
    return player;
  }

  updatePlayer(id, newPlayer) {
    const player = this.getById(id);
    if (player) {
      newPlayer = Object.assign(oldPlayer, newPlayer);
      this.players[player.id] = newPlayer;
      return newPlayer;
    }
    return {};
  }

  deletePlayer(oldPlayer) {
    const player = this.getById(oldPlayer.id);
    if (player) {
      delete this.players[player.id];
      return true;
    }
    return false;
  }

  getAll() {
    return Object.values(this.players);
  }
}

module.exports = PlayerManager;