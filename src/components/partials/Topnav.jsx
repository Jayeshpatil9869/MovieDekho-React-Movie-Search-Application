import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearch = async () => {
    if (!query) {
      setSearches([]);
      return;
    }
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      GetSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="sticky top-0 z-50 bg-[#25232A]/80 backdrop-blur-md">
      <div className="h-[70px] flex items-center px-6">
        <div className="relative flex items-center w-full max-w-2xl">
          <i className="absolute left-4 text-2xl text-zinc-400 ri-search-2-line"></i>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="w-full bg-[#2A2A2A] text-white pl-12 pr-4 py-3 rounded-full text-base outline-none border border-zinc-700 focus:border-[#6556CD] transition-colors"
            type="text"
            placeholder="Search movies, shows and more..."
          />
          {query.length > 0 && (
            <i
              onClick={() => setQuery("")}
              className="absolute right-4 text-2xl text-zinc-400 ri-close-fill cursor-pointer hover:text-white transition-colors"
            ></i>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searches.length > 0 && (
          <div className="absolute top-full left-6 right-6 mt-2 max-w-2xl bg-[#2A2A2A] rounded-lg shadow-xl border border-zinc-700 overflow-hidden">
            {searches?.map((s, i) => (
              <Link to={`/${s.media_type}/details/${s.id}`}
                key={i}
                className="flex items-center gap-4 p-4 hover:bg-[#353535] transition-colors"
              >
                <img
                  className="w-12 h-12 object-cover rounded-md"
                  src={
                    s.poster_path || s.profile_path
                      ? `https://image.tmdb.org/t/p/original${s.poster_path || s.profile_path}`
                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                  }
                  alt={s.title || s.name}
                />
                <div>
                  <h3 className="text-white font-medium">
                    {s.title || s.name || s.original_name || s.original_title || "Untitled"}
                  </h3>
                  <p className="text-sm text-zinc-400">{s.media_type.toUpperCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topnav;
