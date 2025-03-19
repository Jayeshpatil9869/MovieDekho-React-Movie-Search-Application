import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {

  return (
    <div className="w-[20%] h-full border-r border-zinc-700 p-8 bg-[#25232A] flex flex-col">
      {/* Logo */}
      <h1 className="text-2xl text-white font-bold flex items-center mb-10">
        <i className="text-[#6556CD] text-2xl ri-tv-fill mr-2"></i>
        <span>MovieDekho</span>
      </h1>

      {/* Navigation Links */}
      <nav className="flex flex-col text-zinc-400 text-lg gap-3">
        <h2 className="text-white font-semibold text-lg mb-4">New Feeds</h2>
        <Link to="/trending" className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg transition-all duration-300 cursor-pointer">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg transition-all duration-300 cursor-pointer">
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg transition-all duration-300 cursor-pointer">
          <i className="ri-movie-2-fill"></i> Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg transition-all duration-300 cursor-pointer">
          <i className="ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link to="/people" className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg transition-all duration-300 cursor-pointer">
          <i className="ri-group-fill"></i> People
        </Link>

        <hr className="border-none h-[1px] bg-zinc-600 my-5" />

        <h2 className="text-white font-semibold text-lg mb-4">Website Information</h2>
        <Link to="/about" className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg transition-all duration-300 cursor-pointer">
          <i className="ri-information-fill"></i> About
        </Link>
        <Link className="hover:bg-[#6556CD] p-4 hover:text-white rounded-lg transition-all duration-300 cursor-pointer">
          <i className="ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
