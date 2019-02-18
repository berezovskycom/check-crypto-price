const path = require(`path`);
const express = require(`express`);
const CoinGecko = require(`coingecko-api`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);

const app = express();
const CoinGeckoClient = new CoinGecko();

app.use(cors());
app.use(bodyParser.json());

const getCryptoInfo = async(cryptoName, currency) => {
  const data = await CoinGeckoClient.coins.fetch(cryptoName, {
    tickers: false,
    developer_data: false,
    localization: false,
  });
  return data;
};

const getListOfCrypto = async() => (
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

getListOfCrypto().then((object) => {
  object.data.map((coin) => {
    createGetRequest(coin);
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

app.listen(3001, (error) => {
  if (error) console.log(error);
  console.log(`Listening on port: ${3001}`);
});

// function createHtmlPage(object) {
//   const { data } = object;
//   const {
//     name,
//     symbol,
//     genesis_date,
//     market_cap_rank,
//     image,
//     market_data,
//     last_updated,
//   } = data;

//   const {
//     current_price,
//     high_24h,
//     low_24h,
//     market_cap_change_24h_in_currency,
//     market_cap_change_percentage_24h_in_currency,
//   } = market_data;

//   return `
//     <!doctype html>
//       <head>
//         <meta charset="utf-8">
//         <title>${name}</title>
//       </head>
//       <body>
//         <h1>${name}</h1>
//         <span>${symbol}</span>
//         <ul>
//           <li>${genesis_date}</li>
//           <img src="${image.large}" alt="${name}">
//           <li>Since ${genesis_date}</li>
//           <li>Rank #${market_cap_rank}</li>
//           <li>Last updated: ${last_updated}</li>
//           <li>Current Price: ${current_price.usd}$</li>
//           <li>hi: ${high_24h.usd}$</li>
//           <li>lo: ${low_24h.usd}$</li>
//           <li>Market Change in Currency: ${market_cap_change_percentage_24h_in_currency.usd}%</li>
//         </ul>
//       </body>
//     </html>
//   `;
// }
