/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class History extends Component {
  constructor() {
    super();
    this.handleDateChange = this.handleDateChange.bind(this);
    this.submitDateHistory = this.submitDateHistory.bind(this);
    this.state = {
      oldPrice: 0,
    };
  }

  handleDateChange({ target: input }) {
    const d = input.value.split(`-`);
    [d[0], d[1], d[2]] = [d[2], d[1], d[0]];
    this.setState({
      formattedDate: d.join(`-`),
    });
  }

  submitDateHistory() {
    const { of } = this.props;
    const { formattedDate } = this.state;
    fetch(`http://localhost:3001/api/history`, {
      method: `POST`,
      mode: `cors`,
      cache: `no-cache`,
      credentials: `same-origin`,
      headers: {
        "Content-Type": `application/json`,
      },
      redirect: `follow`,
      referrer: `no-referrer`,
      body: JSON.stringify({ name: of, date: formattedDate }),
    })
      .then(res => res.json())
      .then(data => this.setState({ oldPrice: data }))
      .catch(err => console.log(err));
  }

  render() {
    const { oldPrice, formattedDate } = this.state;
    const { from } = this.props;

    return (
      <div className="History">
        <label htmlFor="history" className="History__Title">
          View Price on a specific date:
          <input
            type="date"
            id="history"
            name="history"
            min={from}
            className="History__DateInput"
            data-date-inline-picker="true"
            onChange={this.handleDateChange}
          />
        </label>
        <button
          type="submit"
          className="History__Submit"
          onClick={this.submitDateHistory}
        >
          Submit
        </button>
        <span
          className="History__Price"
          title={formattedDate}
        >
          {oldPrice}
          $
        </span>
      </div>
    );
  }
}

History.propTypes = {
  of: PropTypes.string.isRequired,
  from: PropTypes.string,
};

History.defaultProps = {
  from: `2000-01-01`,
}

export default History;
