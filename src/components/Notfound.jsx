import React from 'react';
import { Link } from 'react-router-dom';
import loader from '/404.gif'; // Path to your 404 GIF image

const Notfound = ({ showCloseButton, navigate }) => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-[100] bg-[rgba(0,0,0,0.9)] flex items-center justify-center">
      {showCloseButton && (
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-close-fill cursor-pointer text-4xl text-zinc-300 absolute right-[2%] top-[3%]"
        >
          {/* Close icon */}
        </Link>
      )}
      
      <div className="flex flex-col items-center justify-center text-white">
        <img className="h-[50%] mb-4" src={loader} alt="404 Not Found" />
        <h2>404 - Video Not Found</h2>
        <p>Sorry, we couldn't find the video you were looking for.</p>
      </div>
    </div>
  );
};

export default Notfound;
