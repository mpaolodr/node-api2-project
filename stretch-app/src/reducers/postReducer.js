import { LOADING, FETCH_DATA } from "../actions";

const initialState = {
  data: [],
  isLoading: false
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
