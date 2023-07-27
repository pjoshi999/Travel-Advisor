import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function Maps({ coordinates, placeCoordinates, range }) {
  const [restaurants, setRestaurants] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
  });

  const [map, setMap] = useState();

  const containerStyle = {
    width: "65vw",
    height: "90vh",
  };

  const center = {
    lat: placeCoordinates.latitude,
    lng: placeCoordinates.longitude,
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const url =
      "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=51.507351&tr_latitude=51.507351&bl_longitude=-0.827758&tr_longitude=-0.127758";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    const data = await fetch(url, options);
    const json = await data.json();
    setRestaurants(json?.data);
  };

  return !isLoaded || !restaurants || restaurants.length === 0 ? (
    <div className="w-[65vw] h-[94vh] bg-[#616161] text-[#616161] animate-pulse"></div>
  ) : (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      defaultZoom={14}
      zoom={Number(range)}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {coordinates?.map((coordinate, index) => (
        <React.Fragment key={index}>
          <Marker
            position={{
              lat: Number(coordinate?.lat),
              lng: Number(coordinate?.lng),
            }}
          />
        </React.Fragment>
      ))}
    </GoogleMap>
  );
}

export default React.memo(Maps);
