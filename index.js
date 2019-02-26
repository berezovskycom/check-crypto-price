const path = require(`path`);
const express = require(`express`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);

const app = express();

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
  // eslint-disable-next-line no-console
  if (error) console.log(error);
});
