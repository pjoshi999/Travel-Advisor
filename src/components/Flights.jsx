import React, { useEffect, useState } from "react";

const Flights = ({ date, range, setRange }) => {
  const [flights, setFlights] = useState([]);
  const [flightsPoll, setFlightsPoll] = useState([]);
  const [flightsURL, setFlightsURL] = useState([]);

  useEffect(() => {
    // Fetching Airports Data
    getFlightData()
      .then(() => getFlightsPoll())
      .then(() => getFlightsURL());
  }, [date]);

  const getFlightData = async () => {
    const url = `https://travel-advisor.p.rapidapi.com/flights/create-session?o1=DEL&d1=BLR&dd1=${date}&currency=USD&ta=1&c=0`;

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
      setFlights(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getFlightsPoll = async () => {
    const url2 = `https://travel-advisor.p.rapidapi.com/flights/poll?sid=${flights?.search_params?.sid}&so=PRICE&currency=USD&n=15&ns=NON_STOP%2CONE_STOP&o=0`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    try {
      const data = await fetch(url2, options);
      const json = await data.json();
      setFlightsPoll(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getFlightsURL = async () => {
    const url3 = `https://travel-advisor.p.rapidapi.com/flights/get-booking-url?searchHash=${flights?.summary?.sh}&Dest=BLR&id=${flightsPoll?.itineraries[4]?.l[1]?.id}&Orig=DEL&searchId=${flights?.search_params?.sid}&impressionId=${flightsPoll?.itineraries[4]?.l[1]?.impressionId}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    try {
      const data = await fetch(url3, options);
      const json = await data.json();
      setFlightsURL(json);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("flights: \n");
  // console.log(flights);
  // console.log("flightsPoll: \n");
  // console.log(flightsPoll);
  // console.log("flightsURL: \n");
  // console.log(flightsURL);

  return (
    <div className="border border-black mx-96 my-32 bg-black text-white flex flex-col h-72 scale-150">
      <h1 className="text-center pt-2 uppercase">Please Enter Departure Date from top left corner</h1>
      <div className="flex justify-around">
        <div className="border border-black m-5 px-3 py-2 w-72 bg-white text-black">
          <h1>From:</h1>
          <h1 className="text-5xl py-2">Delhi</h1>
          <p>DEL, Kempegowda International Airport</p>
        </div>
        <div className="border border-black m-5 px-3 py-2 w-72 bg-white text-black">
          <h1>To:</h1>
          <h1 className="text-5xl py-2">Bangalore</h1>
          <p>BLR, Indira Gandhi Intl Airport</p>
        </div>
      </div>
      <a
        href={
          flights
            ? flightsURL?.partner_url
            : alert("Response from API took longer. Apologies")
        }
        target="_blank"
        rel="noreferrer"
        className="bg-white text-black font-medium px-3 py-2 rounded-full mx-10 text-center"
      >
        Get Details
      </a>
    </div>
  );
};

export default Flights;
