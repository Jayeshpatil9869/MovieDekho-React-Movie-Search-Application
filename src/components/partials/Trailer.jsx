import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  
  // Ensure that state[category] and its properties exist before accessing videos
  const ytvideo = useSelector((state) => state[category]?.info?.videos || null);

  if (!ytvideo || !ytvideo.key) {
    return null; // 
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-[100] bg-[rgba(0,0,0,0.9)] flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#6556CD] ri-close-fill cursor-pointer text-4xl text-zinc-300 absolute right-[2%] top-[3%]"
      ></Link>

      {ytvideo ? (
        <ReactPlayer
        controls
          height={720}
          width={1370}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
