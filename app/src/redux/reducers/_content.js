import { SET_CSKH } from '../constants';

const initialState = {
  cskh: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CSKH:
      return {
        ...state,
        cskh: action.payload,
      };
    default:
      return { ...state };
  }
}
