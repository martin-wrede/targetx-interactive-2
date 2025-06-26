import React, { useContext } from 'react';
import Gallery from './Gallery';

import { Context } from '../Context';


export default function Planner() {
  const { data } = useContext(Context);
 
  return (
 <div>
      <h1>Try the Planner </h1>
<br/>

  
    <br /> <br />
  
      <h2> 1 Business Idea Input</h2>

            <iframe
            src="https://react-chatbot-air-prompt-2.pages.dev/?part2=none"

            title="External Content"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>

       
       <br />
         <br />
         <br />
       
       <b>Zusätzliche Tools / Optional</b>

       <br/>

     <h2>Design Thinking Workflow</h2>

       <img
          className="content-image"
          src= "/targetx-interactive-2/public/designthinking.jpg"
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