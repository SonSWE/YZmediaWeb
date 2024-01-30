import { useSelector } from "react-redux";
// khai báo các key để lưu thông tin vào localStorage
const userStorageKey = "user";
const userRemember = "userRemember";
const authenStorageKey = "61A15DF733924A4EB35CA268E6343998";

export const get_Function_User = () => {
  const userLocalStorage = getUserFromStorage();
  return userLocalStorage?.FunctionSettings ?? [];
};

export const get_FuncByPrid = (prid) => {
  const userLocalStorage = getUserFromStorage();
  return userLocalStorage?.FunctionSettings.filter((e) => e.Function_Pri_Id === prid) ?? [];
};

// user
export const get_token = () => {
  const userLocalStorage = getUserFromStorage();
  return userLocalStorage?.Access_Token;
};

export const get_User_Name = () => {
  const userLocalStorage = getUserFromStorage();
  return userLocalStorage?.User_Name;
};

export const get_link_server_file = () => {
  const userLocalStorage = getUserFromStorage();
  return userLocalStorage?.Link_Server_file;
};

export const getUserFromStorage = () => {
  try {
    let _value = localStorage.getItem(userStorageKey) ?? "";
    if (_value === undefined || _value === null) {
      _value = "";
    }
    //
    if (_value !== "") {
      return JSON.parse(_value);
    }
  } catch { }
  return {};
};

export const saveUserToStorage = (objUser) => {
  localStorage.setItem(userStorageKey, JSON.stringify(objUser));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem(userStorageKey);
  localStorage.removeItem(userRemember);
};

// user
export const getAuthenFromStorage = () => {
  try {
    let _value = localStorage.getItem(authenStorageKey) ?? "";
    if (_value === undefined || _value === null) {
      _value = "";
    }
    //
    if (_value !== "") {
      return JSON.parse(_value);
    }
  } catch { }
  return {};
};

export const saveAuthenToStorage = (objAuthen) => {
  localStorage.setItem(authenStorageKey, JSON.stringify(objAuthen));
};

export const removeAuthenFromStorage = () => {
  localStorage.removeItem(authenStorageKey);
};

export const getAllCode = () => {
  return useSelector((state) => state.allcodeReducer.ALLCODE);
}

export const getAllCodeByCdNameAndCdType = (cdname, cdtype) => {
  var all_code = useSelector((state) => state.allcodeReducer.ALLCODE);
  return all_code?.filter((e) => e.Cdname === cdname && e.Cdtype === cdtype)
}

export const getErrorDef = () => {
  return useSelector((state) => state.errorDefReducer.ERROR_DEFS);
}

export const getErrorDefByCode = (errorCode) => {
  var errorDefs = useSelector((state) => state.errorDefReducer.ERROR_DEFS);
  return errorDefs?.filter((e) => e.Error_Code == errorCode);
}