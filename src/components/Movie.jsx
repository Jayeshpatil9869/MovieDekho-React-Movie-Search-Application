import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MovieDekho | Movies " + category.toUpperCase();

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovie((prevState) => {
          const newMovie = data.results.filter(
            (item) => !prevState.some((prevItem) => prevItem.id === item.id)
          );
          return [...prevState, ...newMovie];
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
    setMovie([]);
    setHasMore(true);
    GetMovie();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="p-[2%] w-screen h-screen">
      <div className="w-full flex items-center justify-between gap-10">
        <div className="flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer text-2xl text-zinc-400"
          ></i>
          <h1 className="text-2xl text-zinc-400 font-semibold">
            Movie
            <small className="text-sm text-zinc-500 ml-2">({category})</small>
          </h1>
        </div>
        <Topnav />
        <div className="flex items-center gap-4">
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        endMessage={<p>No more data available</p>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
