import { useAxios } from "../connection/APIConnection";

export const useLoginApi = () => {
  const apiConnection = useAxios();

  return {
    Login: (prop) => {
      return apiConnection.httpRequestNonNotifyV2("POST", "api/sso/auth", prop, null, true);
    },
    RefreshToken: (prop) => {
      return apiConnection.httpRequestNonNotifyV2("POST", "api/sso/auth", prop, null, false);
    },
    Checkalive: (prop) => {
      return apiConnection.httpRequestNonNotifyV2("GET", "api/sso/checkalive", null, null, false);
    },
    Logout: (prop) => {
      return apiConnection.httpRequest("POST", "logout", null, {Refresh_Token : prop}, true);
    },
  };
};
