const express = require(`express`);
const CoinGecko = require(`coingecko-api`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);

const app = express();
const CoinGeckoClient = new CoinGecko();

app.use(cors());
app.use(bodyParser.json());

const getCryptoInfo = async (cryptoName) => {
  const data = await CoinGeckoClient.coins.fetch(cryptoName, {
    tickers: false,
    developer_data: false,
    localization: false,
  });
  return data;
};

const getListOfCrypto = async () => (
  // eslint-disable-next-line no-return-await
  await CoinGeckoClient.coins.list()
);

app.post(`/api/getCryptoInfo`, (req, res) => {
  const { cryptoName, currency } = req.body;

  getCryptoInfo(cryptoName, currency)
    .then((data) => {
      res.set(`Content-Type`, `application/json`);
      res.json({ data });
    });
});

app.get(`/api/getListOfCrypto`, (req, res) => {
  getListOfCrypto().then((data) => {
    res.set(`Content-Type`, `application/json`);
    res.json({ data });
  });
});

function createGetRequest(coin) {
  app.get(`/api/${coin.symbol}`, (req, res) => {
    getCryptoInfo(coin.id).then((dataOfCoin) => {
      res.set(`Content-Type`, `application/json`);
      res.json({ dataOfCoin });
    });
  });
}

getListOfCrypto().then((object) => {
  object.data.map((coin) => {
    createGetRequest(coin);
  });
});

const History = async (date) => {
  const data = await CoinGeckoClient.coins.fetchHistory(`bitcoin`, {
    date,
  });
  return data;
};

app.post(`/api/history`, (req, res) => {
  const { date } = req.body;
  History(date).then(response => res.json(response));
});


app.listen(3001, (error) => {
  if (error) console.log(error);
  console.log(`Listening on port: ${3001}`);
});
