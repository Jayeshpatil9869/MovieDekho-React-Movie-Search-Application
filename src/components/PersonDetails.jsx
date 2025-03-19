import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
    console.log(info);
  }, [dispatch, id]);

  if (!info || !info.detail) {
    return <Loading />;
  }

  return info ? (
    <div className="px-[15%] w-screen flex flex-col">
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
      </nav>

      <div className="w-full flex - flex-col">
        <div className="w-[20%] ">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt="Movie Poster"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
            }}
          />

          <hr className="mt-4 border-none h-[2px] bg-zinc-500" />

          <div className="text-2xl text-white">
            {info.externalid?.wikidata_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}
            
          </div>
        </div>

        <div className="w-[80%] flex "></div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
