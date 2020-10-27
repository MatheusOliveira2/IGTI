import React, { Component } from 'react';

export default class InputSalary extends Component {
  handleSalaryChange = (event) => {
    this.props.sonValue(event.target.value);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s4">
            <label htmlFor="salary">{this.props.label}</label>
            <br></br>
            <input
              defaultValue={this.props.value}
              min="1000"
              placeholder={this.props.label}
              id={this.props.label}
              type="number"
              onChange={this.handleSalaryChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
