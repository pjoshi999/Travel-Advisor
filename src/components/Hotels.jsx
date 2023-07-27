import React, { useEffect, useState } from "react";
import Maps from "./Maps";
import Shimmer from "./Shimmer";

const Hotels = ({ placeCoordinates, range, setRange }) => {
  const [hotels, setHotels] = useState([]);
  const coordinates = [];

  useEffect(() => {
    // Fetching Hotels Data
    getHotelData();
  }, [placeCoordinates]);

  const getHotelData = async () => {
    const url = `https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary?bl_latitude=${
      placeCoordinates.latitude - 0.01
    }&bl_longitude=${placeCoordinates.longitude - 0.01}&tr_longitude=${
      placeCoordinates.longitude + 0.01
    }&tr_latitude=${
      placeCoordinates.latitude + 0.01
    }&limit=30&currency=USD&subcategory=hotel%2Cbb%2Cspecialty&adults=1`;

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
      setHotels(json?.data);
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

  return !hotels || hotels.length === 0 ? (
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
        {/* hotels */}
        <div className="overflow-y-scroll h-[87vh]">
          {hotels?.map((hotel) => (
            <>
              <div className="flex py-5" key={hotel.location_id}>
                <img
                  src={hotel?.photo?.images?.medium?.url}
                  alt=""
                  className="w-52 h-40"
                />
                <div className="px-2">
                  <h1 className="text-xl font-bold">
                    {coordinates.push({
                      lat: hotel.latitude,
                      lng: hotel.longitude,
                    })}
                    . {hotel?.name}
                  </h1>
                  <span>{hotel?.rating}⭐</span>
                  <span className="text-xs text-[#9c9c9c]">
                    {hotel?.num_reviews}
                  </span>
                  <h1 className="text-sm text-[#696969]">
                    {hotel?.subcategory ? hotel?.subcategory[0]?.name : ""}{" "}
                  </h1>
                  <h1 className="text-sm text-[#838383] font-medium">
                    {hotel?.location_string}
                  </h1>
                  <h1 className="text-sm text-[#838383] font-medium">
                    {hotel?.price}
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

export default Hotels;
