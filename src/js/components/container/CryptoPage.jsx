import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Title from '../presentational/Title';
import CurrentPrice from '../presentational/CurrentPrice';
import MarketPrice from '../presentational/MarketPrice';
import MarketChange from '../presentational/MarketChange';
import Rank from '../presentational/Rank';
import Symbol from '../presentational/Symbol';
import { parseCreatedAt, parseLastUpdated } from '../../misc/parseDate';

class CryptoPage extends Component {
  constructor() {
    super();
    this.state = {
      name: `Bitcoin`,
      symbol: `btc`,
      genesis_date: parseCreatedAt(`2009-01-03`),
      rank: 1,
      image: `https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579`,
      current_price: `3584`,
      high_24h: `3625.9`,
      low_24h: `3589.9`,
      market_cap_change_percentage_24h_in_currency: `-0.636`,
      last_updated: `11:10`,
      currency: `$`,
      links: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/${this.props.symbol}`)
      .then((res) => {
        /* eslint camelcase: 0 */
        const { data } = res.data.dataOfCoin;
        console.log(data);
        const {
          name,
          symbol,
          genesis_date,
          market_cap_rank,
          image,
          market_data,
          last_updated,
          links,
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
          market_cap_change_percentage_24h_in_currency:
            market_cap_change_percentage_24h_in_currency.usd.toFixed(3),
          last_updated: parseLastUpdated(last_updated),
          links,
        });
      });

    axios.post(`http://localhost:3001/api/history`, {date: '30-12-2017'})
      .then(res => console.log(`old bitcoin: `, res));
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
      links,
    } = this.state;
    const moreInfo = [{
      title: `Since`,
      data: genesis_date,
    }, {
      title: `Subreddit Link`,
      data: links.subreddit_url,
    }, {
      title: `Last updated`,
      data: last_updated,
    }];
    return (
      <div className="CryptoPage">
        <section className="Theme ThemeHeader ThemeHeader--dark">
          <div className="ThemeHeader__DarkCover" />
          <video className="ThemeHeader__Video" muted autoPlay loop>
            <source src="./assets/video/blackpepper.mp4" type="video/mp4" />
          </video>
          <div className="CryptoPage__Header Header">
            <Rank value={rank} className="Header__Top Header__Rank" />
            <Symbol value={symbol} />

            <div className="Header__MainContent">
              <Title name={name} />
              <CurrentPrice value={current_price} currency={currency} />
              <MarketPrice low={low_24h} high={high_24h} currency={currency} />
              <MarketChange percent={market_cap_change_percentage_24h_in_currency} />
            </div>
          </div>
        </section>
        <section className="MoreInfo MoreInfo--dark">
          <ul className="MoreInfo__Container">
            {
              moreInfo.map(info => (
                <li className="MoreInfo__Data" key={info.title}>
                  {
                    info.data && info.data.includes(`ht`)
                      ? <a href={info.data} className="MoreInfo__Data__Link">{info.title}</a>
                      : (`${info.title}: ${info.data}`)
                  }
                </li>
              ))
            }
            <Link to="/menu" className="BackTo__Menu">Back to menu</Link>
          </ul>
        </section>
      </div>
    );
  }
}

export default CryptoPage;
