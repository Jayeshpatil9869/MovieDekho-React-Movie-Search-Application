import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import About from "./components/About";
import Moviedetails from "./components/Moviedetails";
import TvDeatils from "./components/TvDeatils";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/partials/Trailer";
import Notfound from "./components/Notfound";

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDeatils />}> 
            <Route 
              path="/tv/details/:id" 
              element={<Trailer />}
            > 
            </Route>
        </Route>

        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PersonDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
