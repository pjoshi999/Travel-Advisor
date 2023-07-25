import React from "react";

const Shimmer = () => {
  return (
    <div>
      {Array(5)
        .fill("")
        .map((index) => (
          <>
            <div className="flex py-5 mx-5" key={index}>
              <div className="w-52 h-40 bg-[#9c9c9c] text-[#9c9c9c] animate-pulse"></div>
              <div className="px-2 animate-pulse">
                <h1 className="text-xl font-bold bg-[#9c9c9c] text-[#9c9c9c] w-52 mb-3">
                  Place Name
                </h1>
                <h1 className="bg-[#9c9c9c] text-[#9c9c9c] mb-3 w-32">
                  Place Rating
                </h1>
                <h1 className="bg-[#9c9c9c] text-[#9c9c9c] w-24">
                  Place Rating
                </h1>
              </div>
            </div>
            <hr className="w-[28rem]" />
          </>
        ))}
    </div>
  );
};

export default Shimmer;
