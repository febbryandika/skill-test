import React, { useState, useEffect } from 'react';
import PriceListPagination from "./PriceListPagination";
import PriceListTable from "./PriceListTable";
import Select from 'react-select';
import PriceListInput from './PriceListInput';

const PriceList = () => {
  const [dataFish, setDataFish] = useState([]);
  const [dataArea, setDataArea] = useState([]);
  const [dataSize, setDataSize] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchListData, setFetchListData] = useState(false);
  const dataPerPage = 10;

  useEffect(() => {
    const SteinStore = require('stein-js-client');
    const store = new SteinStore(process.env.REACT_APP_API_URL);
    
    const storeData = async () => {
      try {
        const listData = await store.read('list');
        const filterListData = listData
          .filter(
            (row) =>
              row.komoditas !== null &&
              row.area_provinsi !== null &&
              row.area_kota !== null &&
              row.size !== null &&
              row.price !== null &&
              row.area_kota[0] !== " "
          )
          .sort((a, b) => {
            return b.tgl_parsed.localeCompare(a.tgl_parsed);
          });
        setDataFish(filterListData);
        setFetchListData(true);
      } catch (error) {
        console.error("Failed to fetch list data", error);
      }

      try {
        const areaData = await store.read("option_area");
        const filterAreaData = areaData.filter(row =>
          row.province !== null &&
          row.city !== null &&
          row.city[0] !== " "
        );
        setDataArea(filterAreaData);
      } catch (error) {
        console.error("Failed to fetch area data", error);
      }

      try {
        const sizeData = await store.read("option_size");
        const filterSizeData = sizeData.filter(row => row.size !== null);
        setDataSize(filterSizeData);
      } catch (error) {
        console.error("Failed to fetch size data", error);
      }
    };

    storeData();
  }, []);

  let fish = dataFish
    .filter(
      (row) =>
        row.komoditas.toLowerCase().includes(search.toLowerCase()) &&
        row.area_kota.includes(filter)
    )
    .sort((a, b) => {
      if (sortOrder === "a") {
        return a.price - b.price;
      } else if (sortOrder === "b") {
        return b.price - a.price;
      } else if (sortOrder === "c") {
        return a.komoditas.localeCompare(b.komoditas);
      } else if (sortOrder === "d") {
        return b.komoditas.localeCompare(a.komoditas);
      } else {
        return 0;
      }
    }
  );

  const filterOptions = dataArea
    .map((area) => ({
      label: area.city,
      value: area.city,
    }))
    .sort((a, b) => {
      return a.label.localeCompare(b.label);
    }
  );

  const sortOptions = [
    {
      label: "Harga - Terendah",
      value: "a",
    },
    {
      label: "Harga - Tertinggi",
      value: "b",
    },
    {
      label: "Komoditas - A -> Z",
      value: "c",
    },
    {
      label: "Komoditas - Z -> A",
      value: "d",
    },
  ];

  const searchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const filterChange = (event) => {
    if (event === null) {
      setFilter("");
    } else {
      setFilter(event.value);
    }
    setCurrentPage(1);
  };

  const sortChange = (event) => {
    if (event === null) {
      setSortOrder("");
    } else {
      setSortOrder(event.value);
    }
    setCurrentPage(1);
  };

  const addNewFishData = fishData => {
    setDataFish(prev => {
      return [fishData, ...prev];
    });
  };

  const lastItem = currentPage * dataPerPage;
  const firstItem = lastItem - dataPerPage;
  const currentItems = fish.slice(firstItem, lastItem);

  return (
    <div className="price-list">
      <div className="price-list__container">
        <div className="price-list__table-container">
          <div className="price-list__search-filter-container">
            <input
              className="price-list__search"
              type="text"
              onChange={searchChange}
              placeholder="Cari produk ikan"
            />
            <Select
              className="price-list__filter"
              options={filterOptions}
              onChange={filterChange}
              isClearable
              placeholder="Filter berdasarkan kota"
            />
            <Select
              className="price-list__filter"
              options={sortOptions}
              onChange={sortChange}
              isClearable
              placeholder="Urutkan berdasarkan ..."
            />
          </div>
          <PriceListTable data={currentItems} number={firstItem} />
          <PriceListPagination
            data={fish}
            onChangePage={setCurrentPage}
            item={dataPerPage}
            page={currentPage}
          />
          {fish.length === 0 && fetchListData ? (
            <p>Produk yang dicari tidak ditemukan</p>
          ) : null}
        </div>
        <div className="price-list__input-container">
          <PriceListInput
            area={dataArea}
            size={dataSize}
            onSubmitFishData={addNewFishData}
          />
        </div>
      </div>
    </div>
  );
}

export default PriceList;