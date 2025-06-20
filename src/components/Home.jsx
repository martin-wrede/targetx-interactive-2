import React, { useContext } from 'react';
import Gallery from './Gallery';
import { Context } from '../Context';

export default function Home() {
  const { data } = useContext(Context);

  return (
    <div>
       <div className="content_container" id="main">
        <div className="content_main" id="content">
 
      <h1  style={{fontSize: "26px", color:"orange"}}>Stay on Track with an <br />AI Accountability Coach</h1>
        
      {/*
       <img
          className="content-image"
          src= "/targetx-interactive/Home_01.jpg"
          title= "Solo-Preneur"
          alt="Solo-Preneur"
          />
   */}    
         <Gallery  projectNumber="0" />
         

         <button>Try it now!</button>
         
      </div>
      <div id="sidebar" className="content_sub">
        <br/> <br/> <br/><br/>

<span style={{fontSize: "16px"}}>
        <strong  >
          {/*
        Most people don’t fail at productivity, <br/> they fail at staying emotionally connected to their goals. 
     */}

      <br/>
     
          Die meisten Menschen scheitern nicht an der Produktivität,
sondern daran, emotional mit ihren Zielen verbunden zu bleiben.
        </strong>
     
        <br/> <br/>
        - Accountability AI für 19 €/Monat
        </span>
          </div> </div>
         </div>
  )
}
