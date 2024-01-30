import { getUserFromStorage, get_User_Name } from "../../store/actions/sharedActions";
import { Sh_Article_Status_Enum } from "../../utils/constData";
import { useAxios } from "../connection/APIConnection";

export const useArticleApi = () => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/sh/article/search`,
        null,
        {
          p_user_name: get_User_Name(),
          keysearch: keysearch,
          p_com_id: getUserFromStorage()?.Reference_Id,
          from: from,
          to: to,
          p_order_by: orderBy,
        },
        true
      );
    },
    GetById: (id) => {
      return apiConnection.httpRequest(
        "GET",
        "api/sh/article/get-by-id",
        null,
        { p_article_id: id },
        true
      );
    },
    insert: (prop) => {
      // console.log(prop.Avata_File.file, "insert article")

      if (prop.Header_Img.file != undefined) {
        prop.Header_Img = prop.Header_Img.file;
      }
      return apiConnection.httpRequest(
        "POST",
        "api/sh/article/insert",
        prop,
        null,
        true, "multipart/form-data"
      );
    },
    update: (prop) => {
      console.log(prop);
      if (prop.Header_Img.file != undefined) {
        prop.Header_Img = prop.Header_Img.file;
      }
      return apiConnection.httpRequest(
        "POST",
        "api/sh/article/update",
        prop,
        null,
        true, "multipart/form-data"
      );
    },
    approve: (prop) => {

      return apiConnection.httpRequest(
        "POST",
        "api/sh/article/update-status",
        {
          Article_Id: prop.Article_Id,
          User_Name: get_User_Name(),
          Status: Sh_Article_Status_Enum.DaDang,
          Com_Id: getUserFromStorage()?.Reference_Id,
        },
        null,
        true
      );
    },

    unapprove: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/sh/article/update-status",
        {
          Article_Id: prop.Article_Id,
          User_Name: get_User_Name(),
          Status: Sh_Article_Status_Enum.BiTraLai,
          Com_Id: getUserFromStorage()?.Reference_Id,
          Reason_Reject: prop.Reason_Reject,
        },
        null,
        true
      );
    },

    unpublic: (prop) => {
      console.log(prop, "unpublic")
      return apiConnection.httpRequest(
        "POST",
        "api/sh/article/update-status",
        {
          Article_Id: prop.Article_Id,
          User_Name: get_User_Name(),
          Status: Sh_Article_Status_Enum.DaGo,
          Com_Id: getUserFromStorage()?.Reference_Id,
        },
        null,

        true
      );
    },


    delete: (prop) => {
      console.log(prop)
      return apiConnection.httpRequest(
        "POST",
        "api/sh/article/delete",
        {
          Article_Id: prop.Article_Id,
          Modified_By: get_User_Name(),
          Com_Id: getUserFromStorage()?.Reference_Id,
        },
        null,
        true
      );
    },
  };
};
