const express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('./src/Logger'),
  config = require('./src/Config'),
  PingPongRanker = require('./src/PingPongRanker');

const PORT = process.env.PORT || config.DEFAULT_PORT;

const app = express(),
  ranker = new PingPongRanker();

app.use(bodyParser.json());
app.set('json spaces', 2);

app.all('/', (req, res, next) => {
  logger.info(`${req.statusCode} ${req.method} ${req.path}`);
})

/** META*/
app.get('/api', (req, res) => {
  res.send({
    'players': '/api/players',
    'matches': '/api/matches'
  });
});

/** PLAYER GET ALL*/
app.get('/api/players', (req, res) => {
  res.send(ranker.getPlayers());
});

/** PLAYER GET ONE*/
app.get('/api/players/:id', (req, res) => {
  const player = ranker.getPlayerById(req.params.id);
  if (!player) {
    res.status(404).send('Player Not Found');
  } else {
    res.send(player);
  }
});

/** PLAYER ADD */
app.post('/api/players', (req, res) => {
  res.send(ranker.addPlayer(req.body));
});

/** PLAYER UPDATE */
app.put('/api/players/:id', (req, res) => {
  res.send(ranker.updatePlayer(id, req.params.body));
});

/** PLAYER DELETE */
app.delete('/api/players/:id', (req, res) => {
  res.send(ranker.removePlayerById(req.params.id));
});

/** MATCHES GET ALL*/
app.get('/api/matches', (req, res) => {
  res.send(ranker.getMatches());
});

/** MATCHES GET ONE*/
app.get('/api/matches/:id', (req, res) => {
  res.send(ranker.getMatchById(req.params.id));
});

/** MATCHES ADD */
app.post('/api/matches', (req, res) => {
  res.send(ranker.addMatch(req.body));
});

/** MATCHES DELETE */
app.delete('/api/matches/:id', (req, res) => {
  res.send(ranker.removeMatchById(req.params.id));
});


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  let errorMessage = err;
  switch (err.message) {
    case 'error-player-duplicate-name':
      errorMessage = `A player already exists with that name: ${err.playerName}`;
      break;
  }
  res.status(400).send(errorMessage)
});

app.listen(PORT, () => {
  logger.info('Listening on port', PORT);
});

