import React, { useEffect, useState } from "react";
import Maps from "./Maps";
import Shimmer from "./Shimmer";

const Airports = ({ placeCoordinates, airportQuery, range, setRange }) => {
  const [airports, setAirports] = useState([]);
  const coordinates = [];

  useEffect(() => {
    // Fetching Airports Data
    getAirportData();
  }, [placeCoordinates, airportQuery]);

  const getAirportData = async () => {
    const url = `https://travel-advisor.p.rapidapi.com/airports/search?query=${airportQuery}&locale=en_US`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    try {
      const data = await fetch(url, options);
      const json = await data.json();
      setAirports(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getRangeValue = () => {
    const rangeInput = document.getElementById("range-input");
    function getValue() {
      const value = rangeInput.value;
      setRange(value);
    }
    rangeInput.addEventListener("input", getValue);
  };

  return !airports || airports.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="flex pl-3">
      <div className="w-1/2">
        <div className="flex justify-between">
          <label htmlFor="distance">Distance</label>
        </div>
        <input
          type="range"
          name=""
          id="range-input"
          min="13"
          max="18"
          onChange={() => getRangeValue()}
        />

        {/* Airports */}
        <div className="overflow-y-scroll h-[87vh]">
          {airports?.map((airport) => (
            <>
              <div className="flex py-5" key={airport.location_id}>
                <img src="/img/airport.png" alt="" className="w-52 h-40" />
                <div className="px-2">
                  <h1 className="text-xl font-bold">
                    {coordinates.push({
                      lat: airport.latitude,
                      lng: airport.longitude,
                    })}
                    . {airport?.display_name}
                  </h1>
                  <span>{airport?.display_title}</span>
                  <h1 className="text-sm text-[#696969]">
                    Code: {airport?.code}
                  </h1>
                  <h1 className="text-sm text-[#838383] font-medium">
                    State: {airport?.state}
                  </h1>
                  <h1 className="text-sm text-[#838383] font-medium">
                    Country Code: {airport?.country_code}
                  </h1>
                </div>
              </div>
              <hr className="w-[28rem]" />
            </>
          ))}
        </div>
      </div>
      <div>
        <Maps
          coordinates={coordinates}
          placeCoordinates={placeCoordinates}
          range={range}
        />
      </div>
    </div>
  );
};

export default Airports;
