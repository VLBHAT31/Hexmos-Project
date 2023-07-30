import React from 'react'
import CreatePollBtn from "./CreatePollBtn";
import {PrimaryButton,SecondaryButton} from "./MyButton";
import Filter from "./Filter";
import { useNavigate } from 'react-router-dom';
import './MyButton.css';


export default function SideBar({ setSelectedTags }) {
  const navigate = useNavigate();

    let styleSidebar={
        marginLeft:"30px",
        float:"left",
    }

    const handleCreatePollClick = () => {
      navigate('/createpoll');
    };
    
    return (
      <>
      <div style={styleSidebar}>
      <PrimaryButton name="Create Poll" size="large" className="create-poll" onClick={handleCreatePollClick} style={{paddingTop:'11px', margin: '10px'}}/>
      <Filter />
      </div>
      </>
    );
  }
