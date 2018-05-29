const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  logger = require('./api/Logger'),
  config = require('./api/Config'),
  PingPongRanker = require('./api/PingPongRanker');

const PORT = process.env.PORT || config.DEFAULT_PORT;

const app = express(),
  ranker = new PingPongRanker();

app.use(express.static(__dirname + '/dist'));

app.get(['/', /^\/(?!api).*/], function (req, res, next) {
  res.sendFile(path.join(__dirname, '../app/dist', 'index.html'));
});

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  app.set('json spaces', 2);
}

app.all('/', (req, res, next) => {
  logger.info(`${req.statusCode} ${req.method} ${req.path}`);
});

/** META*/
app.get('/api', (req, res) => {
  res.send({
    'players': '/api/players',
    'matches': '/api/matches'
  });
});

/** PLAYER GET ALL*/
app.get('/api/players', (req, res) => {
  ranker.getPlayers().then(players => res.send(players));
});

/** PLAYER GET ONE*/
app.get('/api/players/:id', (req, res) => {
  ranker.getPlayerById(req.params.id).then(player => {
    if (!player) {
      res.status(404).send('Player Not Found');
    } else {
      res.send(player)
    }
  });
});

/** PLAYER GET MATCHES */
app.get('/api/players/:id/matches', (req, res) => {
  ranker.getMatchesByPlayer(req.params.id).then(matches => {
    res.send(matches)
  });
});

/** PLAYER ADD */
app.post('/api/players', (req, res) => {
  ranker.addPlayer(req.body).then(player => res.send(player));
});

/** PLAYER UPDATE */
app.put('/api/players/:id', (req, res) => {
  ranker.updatePlayer(id, req.params.body).then(player => res.send(player));
});

/** PLAYER DELETE */
app.delete('/api/players/:id', (req, res) => {
  ranker.removePlayerById(req.params.id).then(player => res.send(player));
});

/** MATCHES GET ALL*/
app.get('/api/matches', (req, res) => {
  ranker.getMatches(req.query.limit).then(matches => res.send(matches));
});

/** MATCHES GET ONE*/
app.get('/api/matches/:id', (req, res) => {
  ranker.getMatchById(req.params.id).then(match => res.send(match));
});

/** MATCHES ADD */
app.post('/api/matches', (req, res) => {
  ranker.addMatch(req.body).then(match => res.send(match));
});

/** MATCHES DELETE */
app.delete('/api/matches/:id', (req, res) => {
  ranker.removeMatchById(req.params.id).then(match => res.send(match));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  logger.error(err);

  let errorMessage = err;
  let errorCode = 500;
  switch (err.message) {
    case 'error-player-duplicate-name':
      errorMessage = `A player already exists with that name: ${err.playerName}`;
      errorCode = 400;
      break;
  }
  res.status(errorCode).send(errorMessage)
});

app.listen(PORT, () => {
  logger.info('Listening on port', PORT);
});


