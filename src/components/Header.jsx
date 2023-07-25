import React, { useState } from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-3">
      <div className="border border-black px-5 py-2 rounded-full">
        <h1>Enter dates</h1>
      </div>
      <form action="">
        <input
          type="text"
          className="border shadow-lg rounded-full px-5 py-2 w-[50rem]"
          placeholder="Where to?"
        />
      </form>
      <div className="flex justify-evenly">
        <div className="border border-black px-5 py-2 rounded-full">
          <h1>Filter</h1>
        </div>
        <div>
          <select
            name=""
            id=""
            className="border-2 border-black px-5 py-2 rounded-full"
          >
            <option value="" className="">Attraction</option>
            <option value="" className="">Hotels</option>
            <option value="" className="">Restaurants</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
