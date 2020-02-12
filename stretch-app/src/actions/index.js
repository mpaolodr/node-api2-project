import axios from "axios";

// action types
export const LOADING = "LOADING";
export const FETCH_DATA = "FETCH_DATA";

// action creator
export const fetchData = () => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get("http://localhost:5000/api/posts")
    .then(res => {
      dispatch({ type: FETCH_DATA, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
