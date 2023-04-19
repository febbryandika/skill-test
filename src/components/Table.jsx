import React, { useState } from "react";
import formatIDR from "../utils";

const Table = (props) => {
  let count = 1;
  let fish = props.data;

  if (props.search !== "") {
    fish = props.data.filter((row) =>
      row.komoditas.toLowerCase().includes(props.search.toLowerCase())
    );
  }

  if (props.filter !== "") {
    fish = props.data.filter((row) =>
      row.area_kota.includes(props.filter)
    );
  }

  const [sortOrder, setSortOrder] = useState(true);

  const sortData = (column) => {
    const sortedData = fish.sort((a, b) => {
      if (sortOrder) {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    fish = sortedData;
    setSortOrder(sortOrder ? false : true);
  };
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th onClick={() => sortData("komoditas")}>Komoditas</th>
            <th>Provinsi</th>
            <th>Kota</th>
            <th onClick={() => sortData("size")}>Size</th>
            <th onClick={() => sortData("price")}>Harga</th>
          </tr>
        </thead>
        <tbody>
          {fish.map((row, index) => (
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
              <td>Rp. {formatIDR(row.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;