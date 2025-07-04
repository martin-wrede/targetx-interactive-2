import React, { useContext } from 'react';
import Gallery from './Gallery';

import { Context } from '../Context';


export default function Planner() {
  const { data } = useContext(Context);
  const {lang} = useContext(Context);
    const { language } = useContext(Context); // ❌ This returns `undefined`
  // console.log(language); // logs `undefined`

   
  
  let content= null;
 
  if (data[2] && data[2].content_chapter) {
    content = data[2].content_chapter.map((chapter, index) => (
      <div key={index}>
        <h1>{chapter.content_h1}</h1> 
       {/*
        <h2>{chapter.content_h2}</h2>
         */}
        <span>{chapter.content_h1_text}</span>
      <br /> 
      </div>
    ))
    }

 
  return (
 <div>
   {content}    
<br/>

  
    
  

            <iframe
            src={`https://react-chatbot-air-prompt-2.pages.dev/?part2=none&lang=${language}`}

            title="External Content"
            width="100%"
          //   height="100%"
            height="600"
           
            style={{ border: '1px solid #ccc' }}
          ></iframe>

       
       <br />
         <br />
         <br />
      <h1>Workflows & Tools</h1>   
       
      {/*

       {data[2] && data[2].content_h1_2}
     <br/>   
     */}
   <h2>Design Thinking</h2>  
  {data[2] && data[2].content_h2}
       <br/>

  
       <img
          className="content-image"
          src= "/targetx-interactive-2/designthinking.jpg"
          title= "Design Thinking"
          alt="Design Thinking"
            
         
          style={{width:"300px"}}
          />
     <br />
       

     <h2> Image Generation</h2>
     <br />
         <iframe
            src="https://react-image-creator-airtable.pages.dev/"

            title="External Content"
              width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
         
</div>
  );
}