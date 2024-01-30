import axios from "axios";
import { toast } from "react-toastify";


import { useLoginApi } from "../api/login";
import { getUserFromStorage, removeUserFromStorage, saveUserToStorage } from "../../store/actions/sharedActions";


//
let isRefreshing = false;
let subscribers = [];
const ignoreUrls = ["api/sso/auth"];

function onRefreshed(isSuccess, token) {
  var callbacks = subscribers;
  subscribers = [];

  callbacks.map((cb) => cb(isSuccess, token));
}

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

//
const client = axios.create({
  baseURL: import.meta.env.VITE_YZMEDIA_SERVICE,
});

client.interceptors.request.use((config) => {
  const userLocalStorage = getUserFromStorage();

  config.headers["Authorization"] = `Bearer ${userLocalStorage?.Access_Token}`;
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error && error.code === "ECONNABORTED") {
      return Promise.reject(error);
    }

    //
    const originalRequest = error.response?.config;

    if (403 === error.response?.status) {
      toast.error("Không có quyền truy cập");
    } else if (
      401 === error.response?.status &&
      ignoreUrls.indexOf(error.response.config.url) < 0
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        const loginApi = useLoginApi();
        //
        const userLocalStorage = getUserFromStorage();
        if (
          userLocalStorage != undefined &&
          userLocalStorage.User_Name != undefined &&
          userLocalStorage.User_Name != ""
        ) {
          let userLogin = {
            Grant_Type: "refresh_token",
            Refresh_Token: userLocalStorage?.Refresh_Token,
            User_Name: userLocalStorage?.User_Name,
            Password: "",
          };

          loginApi
            .RefreshToken(userLogin)
            .then((res) => {
              if (res.status === 200) {
                userLocalStorage.Access_Token = res.data.Access_Token;
                userLocalStorage.Refresh_Token = res.data.Refresh_Token;
                userLocalStorage.ExpiryTime = res.data.ExpiryTime;
                userLocalStorage.User_Name = res.data.User_Name;

                saveUserToStorage(userLocalStorage);
                window.postMessage({ type: "RESET_TOKEN", payload: res.data });
                onRefreshed(true, res.data.Access_Token);
              } else {
                removeUserFromStorage();
                window.postMessage({ type: "CLEAR_USER" });
                onRefreshed(false);
              }
            })
            .catch(() => {
              removeUserFromStorage();
              window.postMessage({ type: "CLEAR_USER" });
              onRefreshed(false);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
      }

      //
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((isSuccess, token) => {
          if (isSuccess) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(client(originalRequest));
          } else {
            reject();
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

window.axiosClient = client;
