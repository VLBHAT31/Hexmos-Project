import React from 'react'

export default function Heading() {
    let boxStyle={
        backgroundColor:"antiquewhite",
        width:"1100px",
        height:"120px"
    }
    let headStyle={
    paddingTop:"20px",
    paddingLeft:"40px"
    }
    return (
        <div style={boxStyle}>
      <div className="heading" style={headStyle}>
        <h1>FlyWeight Polls</h1>
        </div>
        </div>
    
    );
  }
  