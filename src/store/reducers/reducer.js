import { combineReducers } from "redux";
import { allcodeReducer } from "./allcodeReducer";
import { authReducer } from "./authReducer";
import { errorDefReducer } from "./errorDefReducer";


const reducers = combineReducers({
  allcodeReducer: allcodeReducer,
  // sysparams: sysparamsReducer,
  authReducer: authReducer,
  errorDefReducer: errorDefReducer,
});

export default reducers;
