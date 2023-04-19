import React, { useState, useEffect } from 'react';

const Body = () => {
  const [data, setData] = useState([]);
  let count = 1;
  useEffect(() => {
    const SteinStore = require('stein-js-client');
    const store = new SteinStore(
      'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/'
    );

    store.read('list').then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Komoditas</th>
            <th>Provinsi</th>
            <th>Kota</th>
            <th>Size</th>
            <th>Harga</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (row) =>
                row.komoditas !== null &&
                row.area_provinsi !== null &&
                row.area_kota !== null &&
                row.size !== null &&
                row.price !== null &&
                row.tgl_parsed !== null
            )
            .map((row, index) => (
              <tr key={index}>
                <td>{count++}</td>
                <td>
                  {row.komoditas
                    .toLowerCase()
                    .replace(/\b\w/g, (match) => match.toUpperCase())}
                </td>
                <td>
                  {row.area_provinsi
                    .toLowerCase()
                    .replace(/\b\w/g, (match) => match.toUpperCase())}
                </td>
                <td>
                  {row.area_kota
                    .toLowerCase()
                    .replace(/\b\w/g, (match) => match.toUpperCase())}
                </td>
                <td>{row.size}</td>
                <td>{row.price}</td>
                <td>
                  {new Date(row.tgl_parsed).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Body;