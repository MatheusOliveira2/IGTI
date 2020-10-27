import React, { Component } from 'react';

import css from './counter.module.css';

export default class Counter extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  handleClickMenos = () => {
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter: currentCounter - 1,
      steps: steps + 1,
    });
  };

  handleClickMais = () => {
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter: currentCounter + 1,
      steps: steps + 1,
    });
  };
  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className={css.counterContainer}>
        <button
          className="waves-effect waves-light btn red darken-4"
          onClick={this.handleClickMenos}
        >
          -
        </button>
        <span className={css.counterValue}>{currentCounter}</span>
        <button
          onClick={this.handleClickMais}
          className="waves-effect waves-light btn green darken-4"
        >
          +
        </button>
        <span>({steps})</span>
      </div>
    );
  }
}
