import React, { Component } from 'react';

export default class InputDisabled extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s4">
            <label htmlFor="salary">{this.props.label}</label>
            <br></br>
            <input
              placeholder={this.props.label}
              id={this.props.label}
              type="text"
              value={this.props.value}
              disabled
            />
          </div>
        </div>
      </div>
    );
  }
}
