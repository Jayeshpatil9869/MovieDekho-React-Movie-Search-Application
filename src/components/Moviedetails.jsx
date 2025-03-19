import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieAction";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const Moviedetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  if (!info || !info.detail) {
    return <Loading />;
  }

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.3),rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-[155vh] px-[10%]"
    >
      <nav className="w-full h-[10vh] items-center text-zinc-100 flex gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer text-2xl text-zinc-400"
        ></Link>

        {info.detail.homepage && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={info.detail.homepage}
          >
            <i className="ri-external-link-fill"></i>
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            imdb
          </a>
        )}
      </nav>

      <div className="w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[57vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt="Movie Poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
          }}
        />

        <div className="content ml-[5%] text-white relative">
          <h1 className="text-4xl font-black ">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-xl font-bold text-zinc-3 00">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex items-center gap-x-5 mt-3 mb-3">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <h1 className="font-semibold text-2xl leading-6 w-[60px]">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic ">
            {info.detail.tagline}
          </h1>

          <h1 className="text-xl mt-4 italic mb-3">OverView</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-xl mt-4 italic mb-3">Movie Translated</h1>
          <p>{info.translations.join(" ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="mt-6 absolute bg-[#6556CD] hover:bg-[#5346BD] text-white px-4 py-2 rounded-full font-medium transition-colors inline-flex items-center"
          >
            <i className="ri-play-fill mr-2"></i> Watch Trailer
          </Link>
        </div>
      </div>

      <div className="w-[80%] flex flex-col gap-y-5 mt-10 ">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-10  items-center text-white">
            <h1>Available On Platforms</h1>
            {info.watchproviders.flatrate.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="Provider Logo"
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-10 items-center text-white">
            <h1>Available On Rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="Provider Logo"
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-10 items-center text-white">
            <h1>Available To Buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="Provider Logo"
              />
            ))}
          </div>
        )}
      </div>

      <hr className="mt-4 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl font-semibold text-white mt-6">
        Recommendations & Similar Stuff
      </h1>

      {/* <h1 className="text-2xl font-semibold text-white">Recommendations & similar Stuff</h1> */}
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />

    </div>
  );
};

export default Moviedetails;
