import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

const Header = ({
  setPlaceCoordinates,
  airportQuery,
  setAirportQuery,
  date,
  setDate,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const [hideFilters, setHideFilters] = useState(false);

  useEffect(() => {
    if (query.length >= 3) {
      getAutocompleteData();
    }
  }, [query, airportQuery]);

  const getAutocompleteData = async () => {
    const url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${query}&limit=10&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    const data = await fetch(url, options);
    const json = await data.json();
    setSuggestions(json?.data);
  };

  const getDate = () => {
    const dateInput = document.getElementById("date-input").value;
    setDate(dateInput);
    console.log(date);
  };

  return (
    <div className="flex justify-between p-3 items-center">
      <div className="relative">
        <Popup
          trigger={
            <button className="border border-black px-5 py-2 rounded-full cursor-pointer">
              Enter Dates
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="border border-black h-52 flex flex-col items-center justify-evenly bg-black text-white p-6 scale-150 rounded-xl">
              <label htmlFor="" className="text-xl">
                Enter Date for Departure
              </label>
              <input
                type="date"
                name=""
                id="date-input"
                className="mx-2 text-lg text-black"
              />
              <button
                onClick={() => {
                  getDate();
                  close();
                }}
                className="bg-white text-black rounded-full px-3 py-2 font-medium"
              >
                Submit
              </button>
            </div>
          )}
        </Popup>
      </div>
      <form action="" className="relative" onSubmit={(e) => e.preventDefault()}>
        <img
          src="/img/search.png"
          alt=""
          className="absolute top-[0.60rem] left-3 h-6"
        />
        <input
          type="text"
          className="border shadow-lg rounded-full px-5 pl-10 py-2 w-[50rem]"
          placeholder="Where to?"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onFocus={() => setHideSuggestions(true)}
          // onBlur={() => setHideSuggestions(false)}
        />
        <div className="absolute bg-[#f3f3f3] w-full px-5 z-20 rounded-lg">
          {query !== "" &&
            hideSuggestions === true &&
            suggestions?.map((suggestion) => (
              <div className="flex items-center cursor-pointer">
                <img src="/img/search.png" alt="" className="h-5" />
                <h1
                  className="pl-5 py-2 w-full"
                  onClick={() => {
                    setQuery(suggestion?.result_object?.name);
                    setPlaceCoordinates({
                      latitude: Number(suggestion?.result_object?.latitude),
                      longitude: Number(suggestion?.result_object?.longitude),
                    });
                    setAirportQuery(query);
                    setHideSuggestions(false);
                  }}
                >
                  {suggestion?.result_object?.name}
                </h1>
              </div>
            ))}
        </div>
      </form>
      <div className="flex justify-evenly items-center">
        <div
          className="border border-black px-5 py-2 rounded-full mx-5 cursor-pointer"
          onClick={() => setHideFilters(!hideFilters)}
        >
          <h1>Filter</h1>
        </div>
        <div className="relative">
          {/* <select
            name=""
            id=""
            className="border-2 border-black px-5 py-2 rounded-full text-center cursor-pointer"
          >
            <option value="" className="font-medium cursor-pointer">
              Attraction
            </option>
            <option value="" className="font-medium cursor-pointer">
              Hotels
            </option>
            <option value="" className="font-medium cursor-pointer">
              Restaurants
            </option>
          </select> */}

          <div
            className="border-2 border-black flex px-5 py-2 rounded-full text-center"
            onClick={() => setHideFilters(!hideFilters)}
          >
            <a href="/">Attractions</a>
            <img src="/img/arrow-down.png" alt="" />
          </div>

          {hideFilters && (
            <div className="absolute flex flex-col top-[3.05rem] rounded-lg">
              <a
                href="/hotels"
                className="z-20 w-[120%] border-2 border-black px-5 py-2 bg-black text-white text-center cursor-pointer"
              >
                Hotels
              </a>
              <a
                href="/restaurants"
                className="z-20 w-[120%] border-2 border-black px-5 py-2 bg-black text-white text-center cursor-pointer"
              >
                Restaurants
              </a>
              <a
                href="/airports"
                className="z-20 w-[120%] border-2 border-black px-5 py-2 bg-black text-white text-center cursor-pointer"
              >
                Airports
              </a>
              <a
                href="/flights"
                className="z-20 w-[120%] border-2 border-black px-5 py-2 bg-black text-white text-center cursor-pointer"
              >
                Flights
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
