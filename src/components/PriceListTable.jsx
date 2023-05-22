import React from "react";
import formatIDR from "../utils";

const PriceListTable = (props) => {
  return (
    <div>
      <div className="price-list-table">
        <table>
          <thead>
            <tr>
              <th className="price-list-table__number">No</th>
              <th>Komoditas</th>
              <th>Provinsi</th>
              <th>Kota</th>
              <th className="price-list-table__number">Size</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((row, index) => (
              <tr key={index}>
                <td>{index + props.number + 1}</td>
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
    </div>
  );
};

export default PriceListTable;