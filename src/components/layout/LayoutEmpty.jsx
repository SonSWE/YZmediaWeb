import React from "react";

export const LayoutEmpty = props => {
  
  return (
    <>
      <div className="app">
        <props.component />
      </div>
    </>
  );
};
