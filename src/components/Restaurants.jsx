import React, { useEffect, useState } from "react";
import Maps from "./Maps";
import Shimmer from "./Shimmer";

const Restaurants = ({ placeCoordinates, range, setRange }) => {
  const [restaurants, setRestaurants] = useState([]);
  const coordinates = [];

  useEffect(() => {
    // Fetching Restaurants Data
    getRestaurantData();
  }, [placeCoordinates]);

  const getRestaurantData = async () => {
    const url = `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=${
      placeCoordinates.latitude - 0.01
    }&tr_latitude=${placeCoordinates.latitude + 0.01}&bl_longitude=${
      placeCoordinates.longitude - 0.01
    }&tr_longitude=${
      placeCoordinates.longitude + 0.01
    }&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US`;

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
      setRestaurants(json?.data);
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

  return !restaurants || restaurants.length === 0 ? (
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
        {/* Restaurants */}
        <div className="overflow-y-scroll h-[87vh]">
          {restaurants?.map((restaurant) => (
            <>
              <div className="flex py-5" key={restaurant.location_id}>
                <img
                  src={restaurant?.photo?.images?.medium?.url}
                  alt=""
                  className="w-52 h-40"
                />
                <div className="px-2">
                  <h1 className="text-xl font-bold">
                    {coordinates.push({
                      lat: restaurant.latitude,
                      lng: restaurant.longitude,
                    })}
                    . {restaurant?.name}
                  </h1>
                  <span>{restaurant?.rating}⭐</span>
                  <span className="text-xs text-[#9c9c9c]">
                    {restaurant?.num_reviews}
                  </span>
                  <h1 className="text-sm text-[#696969]">
                    {restaurant?.cuisine?.map((item, index) => (
                      <span key={index}>{item?.name}, </span>
                    ))}
                  </h1>
                  <h1 className="text-sm text-[#838383] font-medium">
                    {restaurant?.location_string}
                  </h1>
                  <h1 className="text-sm text-[#838383] font-medium">
                    {restaurant?.price}
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

export default Restaurants;
