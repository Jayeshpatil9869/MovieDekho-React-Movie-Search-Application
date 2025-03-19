export { removeperson } from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const combinedCredits = await axios.get(`/person/${id}/combine_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    
    let theultimatedtails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits :combinedCredits.data,
      movieCredits : movieCredits.data,
      tvCredits : tvCredits.data
    };
    dispatch(loadperson(theultimatedtails));
  } catch (error) {
    console.log("Error :", error);
  }
};
