import React, { useState, useEffect } from 'react';
import Interest from './Interest';
import css from './interests.module.css';

import { jurosCompostos } from '../utils/jurosCompostos.js';

export default function Interests(props) {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    let results = jurosCompostos(props.montante, props.juros, props.periodo);
    const elementos = [];
    for (let i = 0; i < props.periodo; i++) {
      elementos.push(
        <Interest
          valor={results[i].result}
          rendimento={results[i].somado}
          porcentagem={results[i].porcentagem}
        />
      );
    }
    setInterests(elementos);
  }, [props]);

  return <div className={css.interests}>{interests}</div>;
}
