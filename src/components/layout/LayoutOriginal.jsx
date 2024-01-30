import React, { useEffect, useState } from "react";
import SideBar from "../header/SideBar";
import TopControls from "../header/TopControls";


export const LayoutOriginal = props => {

  return (
    <div className="app">
        <div className="app__outlet">
          <TopControls />

          <div className="app__outlet-inner">
            {/* content */}
            <props.component />
          </div>
        </div>
      </div>
  );
};
