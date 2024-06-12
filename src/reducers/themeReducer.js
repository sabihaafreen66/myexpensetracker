const initialState = {
  darkMode: false,
  premium: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case 'ACTIVATE_PREMIUM':
      return {
        ...state,
        premium: true,
      };
    default:
      return state;
  }
};

export default themeReducer;
