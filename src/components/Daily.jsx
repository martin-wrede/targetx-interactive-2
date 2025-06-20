import React, { useContext, useState } from 'react';
import Gallery from './Gallery';
 
import { Context } from '../Context';

export default function Daily() {
  
  const { data } = useContext(Context);
   const [completed, setCompleted] = useState(false);

  let content= null;

  if (data[1] && data[1].content_chapter) {
    content = data[1].content_chapter.map((chapter, index) => (
      <div key={index}>
        <h1>{chapter.content_h1}</h1>
        <h2>{chapter.content_h2}</h2>
        <span>{chapter.content_h1_text}</span>

        <img
          className="content-image"
          src={`${chapter.content_h2_image}`}
         // src={import.meta.env.BASE_URL + `${chapter.content_h2_image}`}
        />
         <span><i>{chapter.content_h2_text1}</i></span>
         <br />
      <br /> 
      Tasks: <br /> 
      <span>{chapter.content_h2_text2}</span> <br />
   
        <br />
        <button onClick={() => window.open(chapter.button_url)}>{chapter.button}</button>
        <br />
        <br />
      </div>
    ));
  }

  return (
    <div>
      <div className="content_container" id="main">
        <div className="content_main" id="content">

        <h1> Daily Tasks & Motivation</h1>
          
<h2>Heutige Aufgaben &  Motivation</h2> 
<br/>

  <img
          className="content-image"
          src= "/targetx-interactive-2/daily-calendar.jpg"
          alt="Kalendar"
          title= "Kalendar"
         
     
          />
     
<br/>
<br/>

{/* 
      <a href="/planner" className="roadmap-button">See Full Roadmap</a>
*/}
                              
 
        </div>
      </div>
      <div id="sidebar" className="content_sub">
       
        <br />
        <br />
             <img
          className="content-image"
          src= "/targetx-interactive-2/motivation-daily.png"
          alt="Motivation"
          title= "Motivation"
          width="200"
          />
                         
      {/* 
        {data[3] &&  <img src={`${data[3].sidebar_image}`} />}
        */}
        <br />
        <br />
      </div>
      
    </div>
  );
}
                            