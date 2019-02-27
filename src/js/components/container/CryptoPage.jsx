import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Title from '../presentational/Title';
import CurrentPrice from '../presentational/CurrentPrice';
import MarketPrice from '../presentational/MarketPrice';
import MarketChange from '../presentational/MarketChange';
import Rank from '../presentational/Rank';
import Symbol from '../presentational/Symbol';
import { parseCreatedAt, parseLastUpdated } from '../../misc/parseDate';
import History from './History';

class CryptoPage extends Component {
  constructor() {
    super();
    this.state = {
      name: ``,
      symbol: ``,
      genesis_date: ``,
      rank: 0,
      current_price: ``,
      high_24h: ``,
      low_24h: ``,
      market_cap_change_percentage_24h_in_currency: ``,
      last_updated: ``,
      currency: `$`,
      links: [],
    };
  }

  componentDidMount() {
    const { id } = this.props;
    axios.get(`http://localhost:3001/api/${id}`)
      .then((res) => {
        /* eslint camelcase: 0 */
        const { data } = res.data.dataOfCoin;
        const {
          name,
          symbol,
          genesis_date,
          market_cap_rank,
          market_data,
          last_updated,
          links,
        } = data;

        const {
          current_price,
          high_24h,
          low_24h,
          market_cap_change_percentage_24h_in_currency,
        } = market_data;

        this.setState({
          name,
          symbol,
          dateHTMLInput: genesis_date,
          genesis_date: parseCreatedAt(genesis_date),
          rank: market_cap_rank,
          current_price: `${current_price.usd.toFixed(0)}`,
          high_24h: `${high_24h.usd.toFixed(1)}`,
          low_24h: `${low_24h.usd.toFixed(1)}`,
          market_cap_change_percentage_24h_in_currency:
            market_cap_change_percentage_24h_in_currency.usd.toFixed(3),
          last_updated: parseLastUpdated(last_updated),
          links,
        });
      });
  }

  render() {
    const {
      name,
      symbol,
      dateHTMLInput,
      genesis_date,
      rank,
      current_price,
      high_24h,
      low_24h,
      market_cap_change_percentage_24h_in_currency,
      last_updated,
      currency,
      links,
    } = this.state;
    console.log(dateHTMLInput);
    const genesisDatetoCalendar = `2019-01-01`;
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
          {/* <video className="ThemeHeader__Video" muted autoPlay loop>
            <source src="./assets/video/blackpepper.mp4" type="video/mp4" />
          </video> */}
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
            <li>
              <History of={name.toLowerCase()} from={dateHTMLInput} />
            </li>
            <li>
              <Link to="/menu" className="BackTo__Menu">Back to menu</Link>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

CryptoPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CryptoPage;
