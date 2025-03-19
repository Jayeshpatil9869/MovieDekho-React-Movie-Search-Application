import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MovieDekho | Trending " + category.toUpperCase();

  // Get trending data
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category.toLowerCase()}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        // Ensure no duplicate data is added
        setTrending((prevState) => {
          const newTrending = data.results.filter(
            (item) => !prevState.some((prevItem) => prevItem.id === item.id)
          );
          return [...prevState, ...newTrending];
        });
      } else {
        setHasMore(false); // No more data
      }

      // Increment page number after fetching
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false); // Stop fetching if error occurs
    }
  };

  // Refresh data when category or duration changes
  const refershHandler = () => {
    setPage(1); // Reset page to 1
    setTrending([]); // Reset data
    setHasMore(true); // Reset hasMore to true
    GetTrending(); // Fetch the new data
  };

  // Handle category or duration change
  useEffect(() => {
    refershHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="p-[2%] w-screen h-screen">
      <div className="w-full flex items-center justify-between gap-10">
        <div className="flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer text-2xl text-zinc-400"
          ></i>
          <h1 className="text-2xl text-zinc-400 font-semibold">Trending</h1>
        </div>
        <Topnav />
        <div className="flex items-center gap-4">
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending} // Pass the function reference here
        hasMore={hasMore} // Check if there is more data
        loader={<h1>Loading...</h1>} // Show loader
        endMessage={<p>No more data available</p>} // Show when all data is loaded
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
