import React, { useContext } from 'react';
import Gallery from './Gallery';
import { Context } from '../Context';

export default function Home() {
  const { data } = useContext(Context);



  return (
    <div>
       <div className="content_container" id="main">
        <div className="content_main" id="content">
      <h1  style={{fontSize: "26px", color:"orange"}}>   {data[0] && data[0].content_h1}</h1>
    
     
       <img
          className="content-image"
          src= "/Home_01.jpg"
          title= "Solo-Preneur"
          alt="Solo-Preneur"
          />
   
   {/** 
    * 
      <h1  style={{fontSize: "26px", color:"orange"}}>Stay on Track with an <br />AI Accountability Coach</h1>
       
   
         <Gallery  projectNumber="0"  />
         
*/}
<br/>
<br/>
 {data[0] && data[0].content_h1_text}
<br/><br/>
    <button onClick={() => window.open(button1_url)}>{data[0] && data[0].button1}</button>
          
      </div>
      <div id="sidebar" className="content_sub">
        <br/> <br/> <br/><br/>

<span style={{fontSize: "16px"}}>
        <strong  >
          {/*
        Most people don’t fail at productivity, <br/> they fail at staying emotionally connected to their goals. 
     
     - Accountability AI für 19 €/Monat
     
     */}
 <br/>
      <br/>
      {data[0]  && data[0].sidebar_h2}
 <br/> <br/>
        
        </strong>
     
       
        
        </span>
          </div> </div>
         </div>
  )
}
