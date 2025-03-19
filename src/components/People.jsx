import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MovieDekho | Person Shows " + category.toUpperCase();

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      // console.log(data)
      if (data.results.length > 0) {
        setPerson((prevState) => {
          const newPerson = data.results.filter(
            (item) => !prevState.some((prevItem) => prevItem.id === item.id)
          );
          return [...prevState, ...newPerson];
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
    setPerson([]);
    setHasMore(true);
    GetPerson();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="p-[2%] w-screen h-screen">
      <div className="w-full flex items-center justify-between gap-10">
        <div className="flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer text-2xl text-zinc-400"
          ></i>
          <h1 className="text-2xl text-zinc-400 font-semibold">
            Person
            <small className="text-sm text-zinc-500 ml-2">({category})</small>
          </h1>
        </div>
        <Topnav />
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        endMessage={<p>No more data available</p>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
