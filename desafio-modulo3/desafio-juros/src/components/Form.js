import React, { useState } from 'react';

export default function Form(props) {
  const [montante, setMontante] = useState(0);
  const [juros, setJuros] = useState(0);
  const [periodo, setPeriodo] = useState(0);

  const handleMontante = (e) => {
    setMontante(e.target.value);
    props.handleMontante(e.target.value);
  };

  const handleJuros = (e) => {
    setJuros(e.target.value);
    props.handleJuros(e.target.value);
  };

  const handlePeriodo = (e) => {
    setPeriodo(e.target.value);
    props.handlePeriodo(e.target.value);
  };

  return (
    <div>
      <div className="row">
        <div className="col s9">
          <div className="input-field col s4">
            <input
              value={montante}
              onInput={handleMontante}
              placeholder="Montante inicial:"
              id="montante"
              type="number"
              className="validate"
            />
          </div>
          <div className="input-field col s4">
            <input
              value={juros}
              onInput={handleJuros}
              placeholder="Taxa de juros mensal:"
              id="juros"
              type="number"
              className="validate"
            />
          </div>
          <div className="input-field col s4">
            <input
              value={periodo}
              onInput={handlePeriodo}
              placeholder="Período(Meses):"
              id="periodo"
              type="number"
              className="validate"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
