import React, { useState, useEffect } from "react";
import Maps from "./Maps";
import Shimmer from "./Shimmer";

const Body = ({ placeCoordinates, range, setRange }) => {
  const [places, setPlaces] = useState([]);
  const coordinates = [];

  useEffect(() => {
    // Fetching Attractions Data
    getAttractions();
  }, [placeCoordinates]);

  const getAttractions = async () => {
    const url = `https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary?tr_longitude=${
      placeCoordinates.longitude + 0.01
    }&tr_latitude=${placeCoordinates.latitude + 0.01}&bl_longitude=${
      placeCoordinates.longitude - 0.01
    }&bl_latitude=${
      placeCoordinates.latitude - 0.01
    }&currency=USD&lunit=km&lang=en_US`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    const data = await fetch(url, options);
    const json = await data.json();
    setPlaces(json?.data);
  };

  const getRangeValue = () => {
    const rangeInput = document.getElementById("range-input");
    function getValue() {
      const value = rangeInput.value;
      setRange(value);
    }
    rangeInput.addEventListener("input", getValue);
  };

  return !places || places.length === 0 ? (
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
        {/* Attractions */}
        <div className="overflow-y-scroll h-[87vh]">
          {places?.map((place) => (
            <>
              <div className="flex py-5" key={place.location_id}>
                <img
                  src={place?.photo?.images?.medium?.url}
                  alt=""
                  className="w-52 h-40"
                />
                <div className="px-2">
                  <h1 className="text-xl font-bold">
                    {coordinates.push({
                      lat: place.latitude,
                      lng: place.longitude,
                    })}
                    . {place?.name}
                  </h1>
                  <span>{place?.rating}⭐</span>
                  <span className="text-xs text-[#9c9c9c]">
                    {place?.num_reviews}
                  </span>
                  <h1 className="text-sm text-[#696969]">
                    {place?.subcategory ? place?.subcategory[0]?.name : ""}{" "}
                  </h1>
                  <h1 className="text-sm text-[#838383] font-medium">
                    {place?.location_string}
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

export default Body;
