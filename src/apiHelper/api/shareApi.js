import { get_User_Name } from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";
import { getUserFromStorage } from "../../store/actions/sharedActions";

export const useShareApi = (controller) => {
  const apiConnection = useAxios();
  const userStorage = getUserFromStorage();
  return {
    SearchData: (keysearch) => {
      return apiConnection.httpRequest(
        "POST",
        `api/sh/${controller}/search`,
        null,
        { p_user_name: get_User_Name(), keysearch: keysearch },
        true
      );
    },
    SearchDataByComId: (keysearch) => {
      return apiConnection.httpRequest(
        "POST",
        `api/sh/${controller}/search`,
        null,
        {
          p_com_id: userStorage.Reference_Id,
          p_user_name: get_User_Name(),
          keysearch: keysearch,
        },
        true
      );
    },
    GetById: (id) => {
      return apiConnection.httpRequest(
        "POST",
        `api/hrm/${controller}/get-ByID`,
        null,
        { p_user_name: get_User_Name(), p_id: id },
        true
      );
    },
  };
};

export const GetAllHuman = () => {
  const clientAxios = useAxios();
  return clientAxios.httpRequestNonNotify(
    "GET",
    `api/hrm/human/get-all`,
    null,
    { p_user_name: get_User_Name() },
    false
  );
};

export const GetAllCode = () => {
  const clientAxios = useAxios();
  return clientAxios.httpRequestNonNotify(
    "GET",
    `api/sh/allcode/get-all`,
    null,
    null,
    false
  );
};

export const GetErrorDef = () => {
  const clientAxios = useAxios();
  return clientAxios.httpRequestNonNotify(
    "GET",
    `api/sh/error-def/get-all`,
    null,
    null,
    false
  );
};
