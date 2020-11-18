import React, { useState, useEffect } from 'react';

import periods from '../utils/period';

export default function Header({ handleSelectChange, list }) {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [entries, setEntries] = useState(0);
  const dates = periods.createPeriodList();

  const handleSelect = (e) => {
    //handleSelectChange(e.target.value);
    setPeriod(e.target.value);
  };

  useEffect(() => {
    let input = list.reduce((acumulator, item) => {
      if (item.type === '+') {
        return (acumulator += item.value);
      } else {
        return acumulator;
      }
    }, 0);
    setIncome(Number(input));

    let output = list.reduce((acumulator, item) => {
      if (item.type === '-') {
        return (acumulator += item.value);
      } else {
        return acumulator;
      }
    }, 0);
    setExpense(Number(output));
    setBalance(input - output);
    setEntries(list.length);
  }, [list]);
  return (
    <div>
      <div className="col s4">
        <select className="browser-default" onInput={handleSelect}>
          {dates.map((date, i) => {
            return (
              <option key={i} value={date.id}>
                {date.value}
              </option>
            );
          })}
        </select>
        <div className="row">
          <div className="col s2">
            <label>Lançamentos: </label>
            <span>{entries}</span>
          </div>
          <div className="col s2">
            <label>Receita: </label>
            <span>R${income}</span>
          </div>

          <div className="col s2">
            <label>Despesa: </label>
            <span>R${expense}</span>
          </div>
          <div className="col s2">
            <label>Saldo: </label>
            <span>R${balance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
