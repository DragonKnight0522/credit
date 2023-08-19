import { SET_CSKH } from '../constants';

export const setCskh = (data) => async (dispatch) => {
  return dispatch({ type: SET_CSKH, payload: data });
};
