//view
import Dashboard from "../pages/Dashboard/Index";

// import ShareType from "../scenes/company/ShareType/Index";

//layout
import { LayoutOriginal } from "../components/layout/LayoutOriginal";

export const RoutersConfig = [
  {
    Function_Id: "DASHBOARD",
    checkRight: false,
    Function_Url: "/",
    pageLayout: LayoutOriginal,
    pageContent: { component: Dashboard },
  },
  // {
  //   Function_Id: "SHARETYPE",
  //   checkRight: false,
  //   Function_Url: "/share-type",
  //   pageLayout: LayoutOriginal,
  //   pageContent: { component: ShareType },
  // },
];
