import React, { createContext } from "react";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

const UserContext = createContext({
  latitude: 23.021557,
  longitude: 72.57127,
  query: "Ahmedabad",
  date: year + "-" + month + "-" + day,
  range: 5,
});

export default UserContext;
