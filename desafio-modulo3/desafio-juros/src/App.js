import Form from './components/Form';
import { useState } from 'react';
import Interests from './components/Interests';

function App() {
  const [periodo, setPeriodo] = useState(0);
  const [juros, setJuros] = useState(0);
  const [montante, setMontante] = useState(0);

  const handlePeriodo = (value) => {
    setPeriodo(value);
  };

  const handleMontante = (value) => {
    setMontante(value);
  };

  const handleJuros = (value) => {
    setJuros(value);
  };

  return (
    <div className="App">
      <Form
        handlePeriodo={handlePeriodo}
        handleJuros={handleJuros}
        handleMontante={handleMontante}
      />
      <Interests periodo={periodo} montante={montante} juros={juros} />
    </div>
  );
}

export default App;
