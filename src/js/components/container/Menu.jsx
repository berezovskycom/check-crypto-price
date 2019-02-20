import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Menu extends Component {
  constructor() {
    super();
    this.mapThroughList = this.mapThroughList.bind(this);
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
    const { dbList, frontList } = this.state;
    const obj = [];
    dbList.map((coin) => {
      const { symbol, id, name } = coin;
      if (
        symbol.includes(value) ||
        id.includes(value) ||
        name.includes(value)
      ) {
        obj.push(coin);
        this.setState({
          frontList: obj,
        });
      }
    });
  }

  render() {
    const { frontList } = this.state;
    return (
      <section className="Menu">
        <h1 className="Menu__Title">List of cryptos</h1>
        <nav className="Menu__Container">
          {
            frontList.map(coin => <a href={`/${coin.symbol}`} key={coin.id} className="Menu__Item">{coin.name}</a>)
          }
        </nav>
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
