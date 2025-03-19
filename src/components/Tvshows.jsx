import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const Tvshows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MovieDekho | Tv Shows " + category.toUpperCase();

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prevState) => {
          const newTv = data.results.filter(
            (item) => !prevState.some((prevItem) => prevItem.id === item.id)
          );
          return [...prevState, ...newTv];
        });
      } else {
        setHasMore(false);
      }
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTv([]);
    setHasMore(true);
    GetTv();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="p-[2%] w-screen h-screen">
      <div className="w-full flex items-center justify-between gap-10">
        <div className="flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer text-2xl text-zinc-400"
          ></i>
          <h1 className="text-2xl text-zinc-400 font-semibold">
            Tv<small className="text-sm text-zinc-500 ml-2">({category})</small>
          </h1>
        </div>
        <Topnav />
        <div className="flex items-center gap-4">
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        endMessage={<p>No more data available</p>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;
