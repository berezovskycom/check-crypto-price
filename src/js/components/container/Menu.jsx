import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/getListOfCrypto`)
      .then(res => this.setState({ list: res.data.data.data }));
  }

  render() {
    const { list } = this.state;

    return (
      <div>
        {
          list.map((coin) => <a href={`/${coin.symbol}`} key={coin.id}>{coin.name}</a>)
        }
      </div>
    );
  }
}

export default Menu;
