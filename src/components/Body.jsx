import React, { useState, useEffect } from 'react';
import Table from './Table';
import Select from 'react-select';

const Body = () => {
  const [dataFish, setDataFish] = useState([]);
  const [dataArea, setDataArea] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const SteinStore = require('stein-js-client');
    const store = new SteinStore(
      'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/'
    );

    store.read('list').then((data) => {
      setDataFish(data.filter((row) =>
        row.komoditas !== null &&
        row.area_provinsi !== null &&
        row.area_kota !== null &&
        row.size !== null &&
        row.price !== null
      ));
    });

    store.read("option_area").then((data) => {
      setDataArea(
        data
          .filter((row) => row.province !== null && row.city !== null)
      );
    });
  }, []);

  const filterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="app__body">
      <div className="search-filter">
        <input
          className="search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk ikan"
        />
        <Select
          className="filter"
          options={dataArea
            .map((area) => ({
              label: area.city,
              value: area.city,
            }))
            .sort((a, b) => {
              return a.label.localeCompare(b.label);
            })}
          onChange={(e) => filterChange(e.value)}
          placeholder="Filter berdasarkan kota"
        />
      </div>
      <div>
        <Table data={dataFish} search={search} filter={filter} />
      </div>
    </div>
  );
}

export default Body;