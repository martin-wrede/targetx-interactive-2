import React, { useContext, useState } from 'react';
 
import { Context } from '../Context';


export default function Daily() {
  
  const { data } = useContext(Context);
  
  const { roadmap } = useContext(Context);
  const today = new Date().toISOString().split('T')[0];

  const todayTask = roadmap.find(item => item.date === today);
 
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
// here the webpage content starts
  return (
    <div>
      <div className="content_container" id="main">
        <div className="content_main" id="content">

        <h1> Daily Tasks & Motivation</h1>
          
<h2>Heutige Aufgaben &  Motivation</h2> 
<br/>
    
  {todayTask ? (
        <div>
         
          
          <p><strong>Heutiges Datum:</strong> {todayTask.date}</p>
          <p><strong>Task:</strong> {todayTask.task}</p>
           <p><strong>Daily Start Time:</strong> {todayTask.dailyStartTime}</p>
             <p><strong>Daily Hours:</strong> {todayTask.dailyHours}</p>
          <p><strong>Motivation:</strong> {todayTask.motivation}</p>
        </div>
      ) : (
        <p>No task for today.</p>
      )}


        <iframe
            src="https://react-chatbot-air-prompt-2.pages.dev/"  // "https://react-chatbot-airtable.pages.dev/"

            title="External Content"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
     
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
                            