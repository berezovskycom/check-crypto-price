const path = require(`path`);
const express = require(`express`);
const CoinGecko = require(`coingecko-api`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);

const app = express();
const CoinGeckoClient = new CoinGecko();

app.use(cors());
app.use(bodyParser.json());

app.get(`/*.js/`, (req, res) => {
  res.sendFile(path.join(`${__dirname}/prod/bundle.js`), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get(`/*.mp4$/`, (req, res) => {
  console.log(`yo`);
  res.sendFile(path.join(`${__dirname}/prod/assets/video/blackpepper.mp4`), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get(`/*`, (req, res) => {
  res.sendFile(path.join(`${__dirname}/prod/index.html`), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000, (error) => {
  if (error) console.log(error);
  console.log(`Listening on port: 3000`);
});
