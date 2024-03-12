import {
  getUserFromStorage,
  get_User_Name,
} from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const usePostsApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/manager/posts/search`,
        null,
        {
          p_user_name: get_User_Name(),
          keysearch: keysearch,
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
        `api/sh/corporate-action/get-by-id`,
        null,
        { p_com_id: getUserFromStorage()?.Reference_Id, p_corp_action_id: id },
        true
      );
    },
    Insert: (prop) => {
      // prop.Created_By = get_User_Name();
      prop.Post_Thumbnail = prop.Post_Thumbnail.file;

      return apiConnection.httpRequest(
        "POST",
        "api/manager/posts/Insert",
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },
    update: (prop) => {
      prop.Modified_By = get_User_Name();
      return apiConnection.httpRequest(
        "POST",
        "api/sh/corporate-action/update",
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },
    delete: (prop) => {
      prop.Modified_By = get_User_Name();

      return apiConnection.httpRequest(
        "POST",
        "api/sh/corporate-action/delete",
        null,
        {
          p_com_id: prop.Com_Id,
          p_corp_action_id: prop.Corp_Action_Id,
          p_Modified_By: prop.Modified_By,
        },
        true
      );
    },
    approve: (prop) => {
      prop.Modified_By = get_User_Name();

      return apiConnection.httpRequest(
        "POST",
        "api/sh/corporate-action/approve",
        null,
        {
          p_com_id: prop.Com_Id,
          p_corp_action_id: prop.Corp_Action_Id,
          p_Modified_By: prop.Modified_By,
        },
        true
      );
    },
    CloseListShareHolder: (prop) => {
      prop.Modified_By = get_User_Name();
      return apiConnection.httpRequest(
        "POST",
        "api/sh/corporate-action/close-list-shareholder",
        null,
        {
          p_com_id: prop.Com_Id,
          p_corp_action_id: prop.Corp_Action_Id,
          p_Modified_By: prop.Modified_By,
        },
        true
      );
    },
    ProcessCorporate: (prop) => {
      prop.Modified_By = get_User_Name();
      return apiConnection.httpRequest(
        "POST",
        "api/sh/corporate-action/process-corporate",
        null,
        {
          p_com_id: prop.Com_Id,
          p_corp_action_id: prop.Corp_Action_Id,
          p_key: "",
          p_Modified_By: prop.Modified_By,
        },
        true
      );
    },
    RegisterBuy: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/sh/corporate-action/process-register-buy",
        null,
        {
          p_shareholder_id: getUserFromStorage()?.Reference_Id,
          p_shareholder_corp_id: prop.Id,
          p_register_qtty: prop.Register_Qtty,
          p_Modified_By: get_User_Name(),
        },
        true
      );
    },
    GetBuyerByEmail: (email, com_id, share_holder_id) => {
      return apiConnection.httpRequest(
        "GET",
        `api/sh/corporate-action/get-buyer-by-email`,
        null,
        {
          p_email: email,
          p_com_id: com_id,
          p_share_holder_id: share_holder_id,
        },
        true
      );
    },
    TranferRight: (prop) => {
      prop.Created_By = get_User_Name();
      prop.Share_Holder_Id = getUserFromStorage()?.Reference_Id;

      return apiConnection.httpRequest(
        "POST",
        "api/sh/corporate-action/process-register-tranfer-right",
        null,
        prop,
        true
      );
    },
  };
};
