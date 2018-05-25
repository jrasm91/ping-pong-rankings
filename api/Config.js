

module.exports = {
  DEFAULT_PORT: 3000,
  DEFAULT_SCORE: 1500,
  DB_CONNECTION: process.env.MONGODB_URI || require('./env').MONGODB_URI
}