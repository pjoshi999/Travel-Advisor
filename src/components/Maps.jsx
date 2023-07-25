import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function Maps({ coordinates }) {
  const [restaurants, setRestaurants] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBa_LF6TZMcSJONPf4BEkLxZ-gvdSleVfE",
  });

  const [map, setMap] = useState();

  const containerStyle = {
    width: "65vw",
    height: "94vh",
  };

  const center = {
    lat: 51.507351,
    lng: -0.127758,
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
        "X-RapidAPI-Key": "2e150cfb71msh640da216dfa6fe9p1e26dfjsn82aa6cb7ff32",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    const data = await fetch(url, options);
    const json = await data.json();
    console.log(json);
    setRestaurants(json?.data);
  };

  return !restaurants || restaurants.length === 0 ? (
    <div className="w-[65vw] h-[94vh] bg-[#616161] text-[#616161] animate-pulse">
      hello
    </div>
  ) : (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      defaultZoom={15}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {coordinates?.map((coordinate) => (
        <>
          <Marker
            position={{
              lat: Number(coordinate?.lat),
              lng: Number(coordinate?.lng),
            }}
          />
        </>
      ))}
    </GoogleMap>
  );
}

export default React.memo(Maps);
