import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  // console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${
          data?.backdrop_path || data?.profile_path
        })`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full h-[65vh] flex items-end"
    >
      <div className="w-full max-w-3xl p-8 md:p-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          {data.title || data.name || data.original_name || data.original_title}
        </h1>
        
        <p className="text-base text-gray-200 line-clamp-3">
          {data.overview}
          <Link to={`/${data.media_type}/details/${data.id}`} className="ml-2 text-[#6556CD] hover:underline inline-flex items-center">
            more <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </p>

        <div className="flex items-center gap-6 text-sm text-white/80">
          <span className="flex items-center">
            <i className="ri-megaphone-fill text-[#6556CD] mr-2"></i>
            {data.release_date || "N/A"}
          </span>
          <span className="flex items-center">
            <i className="ri-album-fill text-[#6556CD] mr-2"></i>
            {data.media_type.toUpperCase() || "N/A"}
          </span>
        </div>

        <div className="flex gap-4 pt-4">
          <Link className="bg-[#6556CD] hover:bg-[#5346BD] text-white px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center">
            <i className="ri-play-fill mr-2"></i> Watch Trailer
          </Link>
          <Link className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors backdrop-blur-sm">
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
