const initState = {
  ERROR_DEFS: [],
};

// input + output
export const errorDefReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_ERROR_DEF":
      return {
        ...state,
        ERROR_DEFS: payload,
      };
    default:
      return state;
  }
};
