import React, { useState } from 'react';
import Table from './components/Table';
import Header from './components/Header';

export default function App() {
  const [period, setPeriod] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleSelectChange = (periodValue) => {
    setPeriod(periodValue);
    //console.log(period);
  };

  const handleListChange = (list) => {
    setFilteredList(list);
  };
  return (
    <div className="container center">
      <Header
        handleSelectChange={handleSelectChange}
        list={filteredList}
      ></Header>
      <Table period={period} handleListChange={handleListChange}></Table>
    </div>
  );
}
