//view
import Dashboard from "../pages/Dashboard/Index";

import PostList from "../pages/PostManager/PostList";

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
  {
    Function_Id: "POSTS",
    checkRight: false,
    Function_Url: "/quan-ly-bai-viet",
    pageLayout: LayoutOriginal,
    pageContent: { component: PostList },
  },
];
