import React, { Component } from 'react';
import InputDisabled from './InputDisabled';
import InputSalary from './InputSalary';
import { calculateSalaryFrom } from '../utils/calc.js';
import ProgressBar from './ProgressBar';
import css from './progress-bar.module.css';

export default class SalaryCount extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
      baseINSS: '',
      descontoINSS: '',
      baseIRPF: '',
      descontoIRPF: '',
      salarioLiquido: '',
    };
  }

  inputValue = (value) => {
    const result = calculateSalaryFrom(value);
    this.setState({
      fullSalary: value,
      baseINSS: result.baseINSS,
      descontoINSS: result.discountINSS,
      baseIRPF: result.baseIRPF,
      descontoIRPF: result.discountIRPF,
      salarioLiquido: result.netSalary,
    });
  };

  render() {
    const {
      fullSalary,
      baseINSS,
      descontoINSS,
      baseIRPF,
      descontoIRPF,
      salarioLiquido,
    } = this.state;
    return (
      <div>
        Cálculo de Salário
        <InputSalary
          label="Salário Bruto"
          value={fullSalary}
          sonValue={this.inputValue}
        />
        <InputDisabled label="Base INSS" value={baseINSS} />
        <InputDisabled
          label="Desconto INSS"
          value={
            descontoINSS +
            ` (${parseFloat((descontoINSS / fullSalary) * 100).toFixed(2)}%)`
          }
        />
        <InputDisabled label="Base IRPF" value={baseIRPF} />
        <InputDisabled
          label="Desconto IRPF"
          value={
            descontoIRPF +
            ` (${parseFloat((descontoIRPF / fullSalary) * 100).toFixed(2)}%)`
          }
        />
        <InputDisabled
          label="Salário Líquido"
          value={
            salarioLiquido +
            ` (${parseFloat((salarioLiquido / fullSalary) * 100).toFixed(2)}%)`
          }
        />
        <div className="row">
          <div className={css.progressBar}>
            <ProgressBar color=" #e67e22" value={descontoINSS}></ProgressBar>

            <ProgressBar color=" #c0392b" value={descontoIRPF}></ProgressBar>

            <ProgressBar color=" #16a085" value={salarioLiquido}></ProgressBar>
          </div>
        </div>
      </div>
    );
  }
}
