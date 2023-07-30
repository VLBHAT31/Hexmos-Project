import React from 'react';
import Heading from "./Heading";
import VoteComp from "./VoteComp";
import { useParams } from 'react-router-dom';


export default function Vote() {
  const { id } = useParams();
  return (
   
      <>
      <Heading/>
      <VoteComp id={id}/>
      
      </>
  );
}




