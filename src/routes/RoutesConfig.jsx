//view
import Dashboard from "../pages/Dashboard/Index";

import PostList from "../pages/PostsList/Index";
import PostForm from "../pages/PostForm/Index";

//layout
import { LayoutOriginal } from "../components/layout/LayoutOriginal";
import LayoutLeftSideBar from "../components/layout/LayoutLeftSideBar";


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
    Function_Url: "/danh-sach-bai-viet",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: PostList },
  },
  {
    Function_Id: "POSTS_ACTION",
    checkRight: false,
    Function_Url: "/bai-viet",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: PostForm },
  },
];
