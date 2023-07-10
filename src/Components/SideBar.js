import React from 'react'
import CreatePollBtn from "./CreatePollBtn";
import Filter from "./Filter";


export default function SideBar() {
    let styleSidebar={
        marginLeft:"30px",
        float:"left"
    }
    return (
      <>
      <div style={styleSidebar}>
      <CreatePollBtn/>
      <Filter/>
      </div>
      </>
    );
  }
