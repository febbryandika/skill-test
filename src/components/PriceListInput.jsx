import React, { useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

const PriceListInput = (props) => {
  const [commodity, setCommodity] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const provinceOption = Array.from(
    new Set(props.area.map(({ province }) => province))
  );
  const provinceOptions = provinceOption
    .map((area) => ({
      label: area,
      value: area,
    }))
    .sort((a, b) => {
      return a.label.localeCompare(b.label);
    }
  );
  const optionsProvince = [
    { label: "--- Pilih Provinsi ---", value: "", isDisabled: true },
    ...provinceOptions,
  ];

  const cityOption = props.area.filter((row) => row.province === province);
  const cityOptions = cityOption
    .map((area) => ({
      label: area.city,
      value: area.city,
    }))
    .sort((a, b) => {
      return a.label.localeCompare(b.label);
    }
  );
  const optionsCity = [
    { label: "--- Pilih Kota ---", value: "", isDisabled: true },
    ...cityOptions,
  ];

  const sizeOption = Array.from(new Set(props.size.map(({ size }) => size)));
  const sizeOptions = sizeOption
    .map((option) => ({
      label: option,
      value: option,
    }))
    .sort((a, b) => {
      return a.label - b.label;
    }
  );
  const optionsSize = [
    { label: "--- Pilih Size ---", value: "", isDisabled: true },
    ...sizeOptions,
  ];

    const commodityChange = (event) => {
        setCommodity(event.target.value);
    };

    const provinceChange = (event) => {
      if (event === null) {
        setProvince("");
      } else {
        setProvince(event.value);
      }
    };

    const cityChange = (event) => {
      if (event === null) {
        setCity("");
      } else {
        setCity(event.value);
      }
    };

    const sizeChange = (event) => {
      if (event === null) {
        setSize("");
      } else {
        setSize(event.value);
      }
    };

    const priceChange = (event) => {
      setPrice(event.target.value);
    };

    const submitHandler = (event) => {
      event.preventDefault();

      const date = new Date();
      const fishData = {
        uuid: uuidv4(),
        komoditas: commodity.toUpperCase(),
        area_provinsi: province,
        area_kota: city,
        size: size,
        price: price,
        tgl_parsed: date.toISOString().slice(0, 19) + 'Z',
        timestamp: date.getTime().toString(),
      };

      props.onSubmitFishData(fishData);
      setCommodity("");
      setProvince("");
      setCity("");
      setSize("");
      setPrice("");
    }

    return (
      <div className="price-list-input">
        <div className="price-list-input__header">
          <h2>Tambah Data Ikan</h2>
        </div>
        <form className="price-list-input__form" onSubmit={submitHandler}>
          <label>Komoditas</label>
          <input
            className="price-list-input__input-form"
            value={commodity}
            onChange={commodityChange}
            required
          ></input>
          <label>Provinsi</label>
          <Select
            className="price-list-input__select-form"
            value={optionsProvince.find((option) => option.value === province)}
            options={optionsProvince}
            onChange={provinceChange}
            defaultValue={optionsProvince[0]}
            isClearable
            required
          />
          <label>Kota</label>
          <Select
            className="price-list-input__select-form"
            value={optionsCity.find((option) => option.value === city)}
            options={optionsCity}
            onChange={cityChange}
            defaultValue={optionsCity[0]}
            isClearable
            required
          />
          <label>Size</label>
          <Select
            className="price-list-input__select-form"
            value={optionsSize.find((option) => option.value === size)}
            options={optionsSize}
            onChange={sizeChange}
            defaultValue={optionsSize[0]}
            isClearable
            required
          />
          <label>Harga</label>
          <input
            className="price-list-input__input-form"
            value={price}
            onChange={priceChange}
            type="text"
            required
          ></input>
          <button className="price-list-input__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
}

export default PriceListInput;