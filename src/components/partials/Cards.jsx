import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  // console.log(data )
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-lg"
          key={i}
        >
          <div className="aspect-[2/3] overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              src={`https://image.tmdb.org/t/p/original/${
                c.poster_path || c.backdrop_path || c.profile_path
              }`}
              alt={c.title || c.name}
              onError={(e) => {
                e.target.src =
                  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
              }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg text-white font-medium line-clamp-2">
              {c.title || c.name || c.original_name || c.original_title}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-400">
              <i className="ri-calendar-line"></i>
              <span>{c.release_date || c.first_air_date || "N/A"}</span>
            </div>
           {c.vote_average && ( <div className=" flex items-center gap-2 mt-2 text-sm text-yellow-400">
              <i className="ri-star-fill"></i>
              <span>{c.vote_average ? c.vote_average.toFixed(1) : "N/A"}</span>
            </div>)}
          </div>    
        </Link>
      ))}
    </div>
  );
};

export default Cards;