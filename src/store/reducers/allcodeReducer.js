const initState = {
  ALLCODE: [],
};

// input + output
export const allcodeReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_ALLCODE":
      return {
        ...state,
        ALLCODE: payload,
      };
    default:
      return state;
  }
};
