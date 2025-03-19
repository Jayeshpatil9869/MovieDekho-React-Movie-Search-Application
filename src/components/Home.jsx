import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios"; // Corrected the import path
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "MovieDekho | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("All");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomdata);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category.toLowerCase()}/day`
      );
      setTrending(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className="p-5 flex justify-between items-center">
          <h1 className="text-2xl text-zinc-400 font-bold">Trending</h1>
          <Dropdown
            title="Filter"
            options={["all", "movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
