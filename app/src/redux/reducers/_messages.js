const initialAuth = {
  status: false,
  welcome: false,
};

export default function (state = initialAuth, action) {
  switch (action.type) {
    case 'OPEN':
      return { ...state, status: true };
    case 'CLOSE':
      return { ...state, status: false };
    case 'OPEN_WELCOME':
      return { ...state, welcome: true };
    case 'CLOSE_WELCOME':
      return { ...state, welcome: false };
    default:
      return { ...state };
  }
}
