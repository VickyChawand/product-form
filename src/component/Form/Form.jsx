import React, { useState, useEffect } from "react";
import "./form.css";

const AddressForm = ({ address, handleChange, title }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  const [showStateList, setShowStateList] = useState(false);
  const [showCityList, setShowCityList] = useState(false);

  const headers = new Headers({
    "X-CSCAPI-KEY": "eGJoWDJtRTdZSTBNaGJ2R3M2WWFSNGdQQkd2RkVIMUFqdWg3Z2FFNA==",
  });

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch( "https://api.countrystatecity.in/v1/countries",requestOptions);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchStates = async (countryCode) => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`,requestOptions);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,requestOptions);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (value) => {
    setShowCountryList(true);
    setFilteredCountries(
      countries
        .filter((country) =>
          country.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 10)
    );
    handleChange("country", value);
    if (value.length < 1) {
      setShowCountryList(false);
    }
  };

  const handleCountrySelect = (country) => {
    setShowCountryList(false);
    handleChange("country", country.name);
    setSelectedCountryCode(country.iso2);
    fetchStates(country.iso2);
  };

  const handleStateChange = (value) => {
    setShowStateList(true);
    setFilteredStates(
      states
        .filter((state) =>
          state.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 10)
    );
    handleChange("state", value);
    if (value.length < 1) {
      setShowStateList(false);
    }
  };

  const handleStateSelect = (state) => {
    setShowStateList(false);
    handleChange("state", state.name);
    setSelectedStateCode(state.iso2);
    fetchCities(selectedCountryCode, selectedStateCode);
  };

  const handleCityChange = (value) => {
    setShowCityList(true);
    setFilteredCities(
      cities
        .filter((city) =>
          city.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 10)
    );
    handleChange("city", value);
    if (value.length < 1) {
      setShowCityList(false);
    }
  };

  const handleCitySelect = (city) => {
    setShowCityList(false);
    handleChange("city", city.name);
  };
  return (
    <>
      <h3>{title}</h3>
      {/* Address 1 */}
      <div className="details">
        <label>Address Line 1</label>
        <input
          value={address.Address1}
          onChange={(e) => handleChange("Address1", e.target.value)}
        />
      </div>
      {/* Address 2 */}
      <div className="details">
        <label>Address Line 2</label>
        <input
          value={address.Address2}
          onChange={(e) => handleChange("Address2", e.target.value)}
        />
      </div>
      {/* Country */}
      <div className="details">
        <label>Country</label>
        <input
          type="text"
          value={address.country}
          onChange={(e) => handleCountryChange(e.target.value)}
        />
        {showCountryList && (
          <ul className="dropdown">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, idx) => (
                <li key={idx} onClick={() => handleCountrySelect(country)}>
                  {country.name}
                </li>
              ))
            ) : (
              <li onClick={() => handleCountrySelect("")}>No other option</li>
            )}
          </ul>
        )}
      </div>
      {/* State / Province */}
      <div className="details">
        <label>State / Province</label>
        <input
          type="text"
          value={address.state}
          onChange={(e) => handleStateChange(e.target.value)}
        />
        {showStateList && (
          <ul className="dropdown">
            {filteredStates.length > 0 ? (
              filteredStates.map((state, idx) => (
                <li key={idx} onClick={() => handleStateSelect(state)}>
                  {state.name}
                </li>
              ))
            ) : (
              <li onClick={() => handleStateSelect('')}>No other option</li>
            )}
          </ul>
        )}
      </div>
      {/* City / District */}
      <div className="details">
        <label>City / District</label>
        <input
          type="text"
          value={address.city}
          onChange={(e) => handleCityChange(e.target.value)}
        />
        {showCityList && (
          <ul className="dropdown">
            {filteredCities.length > 0 ? (
              filteredCities.map((city, idx) => (
                <li key={idx} onClick={() => handleCitySelect(city)}>
                  {city.name}
                </li>
              ))
            ) : (
              <li onClick={() => handleCitySelect('')}>No other option</li>
            )}
          </ul>
        )}
      </div>
      {/* Postal Code */}
      <div className="details">
        <label>Postal Code</label>
        <input
          value={address.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
        />
      </div>
    </>
  );
};

export default AddressForm;
