import React, { Component } from 'react';
import axios from 'axios';
// import Nav from '../presentational/Nav';
import Title from '../presentational/Title';
import Logo from '../presentational/Logo';
import CurrentPrice from '../presentational/CurrentPrice';
import MarketPrice from '../presentational/MarketPrice';
import MarketChange from '../presentational/MarketChange';
import CurrencyCreated from '../presentational/CurrencyCreated';
import LastUpdated from '../presentational/LastUpdated';
import Rank from '../presentational/Rank';
import { parseCreatedAt } from '../../misc/parseDate';

class CryptoPage extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Bitcoin',
      symbol: 'btc',
      genesis_date: parseCreatedAt('2009-01-03'),
      rank: 1,
      image: `https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579`,
      current_price: '3584',
      high_24h: '3625.9',
      low_24h: '3589.9',
      market_cap_change_percentage_24h_in_currency: -0.636,
      last_updated: '11:10',
      currency: `$`,
    };
  }

  componentDidMount() {
    console.log(this.props.symbol);
    axios.get(`http://localhost:3001/api/${this.props.symbol}`)
      .then((res) => {
        /* eslint camelcase: 0 */
        console.log(res.data.dataOfCoin);
        const { data } = res.data.dataOfCoin;
        const {
          name,
          symbol,
          genesis_date,
          market_cap_rank,
          image,
          market_data,
          last_updated,
        } = data;
        const {
          current_price,
          high_24h,
          low_24h,
          market_cap_change_24h_in_currency,
          market_cap_change_percentage_24h_in_currency,
        } = market_data;
        console.log(`
          name = ${name}
          symbol = ${symbol}
          current_price = ${current_price.usd.toFixed(0)}$
          high in 24h = ${high_24h.usd.toFixed(1)}$
          low in 24h = ${low_24h.usd.toFixed(1)}$
          date of birth = ${genesis_date}
          rank = #${market_cap_rank}
          last updated = ${last_updated}
          imageURL = ${image.large}
          change in 24h/% = ${market_cap_change_percentage_24h_in_currency.usd.toFixed(3)}%
        `);
        this.setState({
          name,
          symbol,
          genesis_date: parseCreatedAt(genesis_date),
          rank: market_cap_rank,
          image: image.large,
          current_price: `${current_price.usd.toFixed(0)}`,
          high_24h: `${high_24h.usd.toFixed(1)}`,
          low_24h: `${low_24h.usd.toFixed(1)}`,
          market_cap_change_percentage_24h_in_currency: market_cap_change_percentage_24h_in_currency.usd.toFixed(3),
          last_updated,
        });
      });
  }

  render() {
    const {
      name,
      symbol,
      genesis_date,
      rank,
      image,
      current_price,
      high_24h,
      low_24h,
      market_cap_change_percentage_24h_in_currency,
      last_updated,
      currency,
    } = this.state;
    return (
      <div className="CryptoPage">
        <div className="header container">
          <Logo name={name} src={image} />
          <Title name={name} symbol={symbol} />
          <Rank value={rank} />
        </div>
        <div className="main container">
          <CurrentPrice value={current_price} currency={currency} />
          <MarketPrice low={low_24h} high={high_24h} currency={currency} />
          <MarketChange percent={market_cap_change_percentage_24h_in_currency} />
        </div>
        <div className="footer container">
          <CurrencyCreated at={genesis_date} />
          <LastUpdated at={last_updated} />
        </div>
      </div>
    );
  }
}

export default CryptoPage;
