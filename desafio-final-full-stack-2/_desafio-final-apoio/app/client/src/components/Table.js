import React, { useState, useEffect } from 'react';
import http from '../services/api';

export default function Table({ period, handleListChange }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const itemsRequest = await http.get('api/transaction', {
        params: { period: '2020-08' },
      });
      setItems(itemsRequest.data);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const itemsRequest = await http.get('api/transaction', {
        params: { period: period },
      });
      setItems(itemsRequest.data);
      handleListChange(items);
    }
    getData();
  }, [period]);

  return (
    <div>
      <table>
        <tbody>
          {items.map((item, i) => {
            return (
              <tr key={i} className={item.type === '+' ? 'green' : 'red'}>
                <td>{item.day}</td>
                <td>
                  {item.category}
                  <br></br>
                  {item.description}
                </td>

                <td>R${item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
