import React from 'react';

import css from './interest.module.css';

export default function Interest(props) {
  const { valor, rendimento, porcentagem } = props;

  return (
    <div>
      <div className={css.interest}>
        <div
          className={`${css.interestDiv} ${
            rendimento >= 0 ? css.green : css.red
          }`}
        >
          <span>R${valor}</span>
          <span>R${rendimento}</span>
          <span>{porcentagem} %</span>
        </div>
      </div>
    </div>
  );
}
