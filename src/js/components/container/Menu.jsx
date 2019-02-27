/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Menu extends Component {
  constructor() {
    super();
    this.mapThroughList = this.mapThroughList.bind(this);
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    this.state = {
      dbList: [],
      frontList: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/getListOfCrypto`)
      .then(res => this.setState({ dbList: res.data.data.data, frontList: res.data.data.data }));
  }

  mapThroughList(event) {
    const { value } = event.target;
    const { dbList } = this.state;
    const deliverFromBackToFront = [];
    dbList.map((coin) => {
      const { symbol, id, name } = coin;
      if (
        symbol.includes(value)
        || id.includes(value)
        || name.includes(value)
      ) {
        deliverFromBackToFront.push(coin);
        this.setState({
          frontList: deliverFromBackToFront,
        });
      }
      return deliverFromBackToFront;
    });
  }

  addToLocalStorage({ target: btn }) {
    const { localStorage } = window;
    const { favCryptos } = localStorage;
    let oldStorage = {};
    if (favCryptos) {
      oldStorage = JSON.parse(favCryptos);
    }
    const s = btn.value.split(`,`);
    const obj = [];
    const info = {
      id: s[0],
      symbol: s[1],
      name: s[2],
    };
    obj.push(info);
    if (oldStorage.length > 0) {
      obj.push(...oldStorage);
    }
    localStorage.setItem(`favCryptos`, JSON.stringify(obj));
    btn.innerText = `Added to favorites!`;
    btn.disabled = true;
    btn.classList.add(`Menu__AddToFavorites--Disabled`);
  }

  render() {
    const { frontList } = this.state;
    return (
      <section className="Menu">
        <h1 className="Menu__Title">List of cryptos</h1>
        <ul className="Menu__Container">
          {
            frontList.map(coin => (
              <li key={`li-${coin.id}`} className="Menu__Item">
                <Link to={`/${coin.symbol}`} key={coin.id} className="Menu__Link">{coin.name}</Link>
                <button
                  type="button"
                  className="Menu__AddToFavorites"
                  key={`fav-${coin.id}`}
                  value={`${coin.id},${coin.symbol},${coin.name}`}
                  onClick={this.addToLocalStorage}
                >
                  Add to favorites
                </button>
              </li>
            ))
          }
        </ul>
        <form className="Form">
          <input
            type="search"
            className="Form__SearchInput"
            placeholder="example: btc"
            onChange={this.mapThroughList}
          />
        </form>
      </section>
    );
  }
}

export default Menu;
