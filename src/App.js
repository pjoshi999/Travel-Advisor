import { useContext, useState } from "react";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import UserContext from "./utils/UserContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Hotels from "./components/Hotels";
import Restaurants from "./components/Restaurants";
import Airports from "./components/Airports";
import Flights from "./components/Flights";

function App() {
  const user = useContext(UserContext);
  const [airportQuery, setAirportQuery] = useState(user.query);
  const [placeCoordinates, setPlaceCoordinates] = useState({
    latitude: user.latitude,
    longitude: user.longitude,
  });
  const [date, setDate] = useState(user.date);
  const [range, setRange] = useState(user.range);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Body
          placeCoordinates={placeCoordinates}
          range={range}
          setRange={setRange}
        />
      ),
    },
    {
      path: "/hotels",
      element: (
        <Hotels
          placeCoordinates={placeCoordinates}
          range={range}
          setRange={setRange}
        />
      ),
    },
    {
      path: "/restaurants",
      element: (
        <Restaurants
          placeCoordinates={placeCoordinates}
          range={range}
          setRange={setRange}
        />
      ),
    },
    {
      path: "/airports",
      element: (
        <Airports
          placeCoordinates={placeCoordinates}
          airportQuery={airportQuery}
          range={range}
          setRange={setRange}
        />
      ),
    },
    {
      path: "/flights",
      element: (
        <Flights
          placeCoordinates={placeCoordinates}
          airportQuery={airportQuery}
          date={date}
          setDate={setDate}
        />
      ),
    },
  ]);

  return (
    <UserContext.Provider value={placeCoordinates}>
      <Header
        setPlaceCoordinates={setPlaceCoordinates}
        airportQuery={airportQuery}
        setAirportQuery={setAirportQuery}
        date={date}
        setDate={setDate}
      />
      <RouterProvider router={appRouter} />
    </UserContext.Provider>
  );
}

export default App;
