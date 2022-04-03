import React from "react";
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";


function Progressbar({percentage, color}){

  return(
 
    <DivProgressBar label="Default">      
      <CircularProgressbar
        value={percentage}
        text={`hoje`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#3e98c7",
          textColor: "#fff",
          pathColor: `${color}`,
          trailColor: "transparent"
        })}
      />
    </DivProgressBar>    
  )
}

const DivProgressBar = styled.div`

  display:flex;
  width: 100px;
  height: 100px;
  align-items:center;
  justify-content: center;
  margin-bottom: 60px;
  padding: 20px;

`
export default Progressbar;