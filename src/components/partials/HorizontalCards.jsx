import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  // Use useMemo to memoize the rendered cards to prevent unnecessary re-renders
  const renderedCards = useMemo(() => {
    return data.length > 0 ? data.map((d, i) => (
      <Link
        to={`/${d.media_type}/details/${d.id}`}
        key={i}
        className="min-w-[260px] max-w-[260px] h-[350px] mr-2 transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-[#2C2B31] p-4 rounded-lg shadow-lg flex flex-col overflow-hidden"
      >
        <div className="h-[65%] overflow-hidden rounded-md mb-3">
          <img
            className="w-full h-full object-cover transition-all duration-300 hover:opacity-90"
            src={`https://image.tmdb.org/t/p/original/${d?.backdrop_path || d?.poster_path}`}
            alt={d.title || d.name || "Movie Poster"}
          />
        </div>
        
        <div className="flex flex-col flex-grow">
          <h1 className="text-lg font-bold text-white truncate mb-1 ">
            {d.title || d.name || d.original_name || d.original_title}
          </h1>
          <p className="text-xs text-gray-400 mb-1 truncate">
            <span className="font-semibold text-gray-300">Release Date:</span> {d.release_date || d.first_air_date || "N/A"}
          </p>
          <p className="text-xs text-gray-300 leading-relaxed overflow-hidden line-clamp-3">
            {d.overview}
          </p>
        </div>
      </Link>
    )): <h1 className="text-3l text-white font-black text-center mt-5"> Nothing to show</h1>
  }, [data]);

  return (
    <div className="w-full h-[420px] p-5 mb-4">
      <div className="w-full h-[380px] overflow-y-hidden flex overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#6556CD] [&::-webkit-scrollbar-track]:bg-[#1F1E24] hover:[&::-webkit-scrollbar-thumb]:bg-[#8678E4] pb-6 gap-3">
        {renderedCards}
      </div>
    </div>
  );
};

export default HorizontalCards;