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

       
       
       <h2>Zusätzliche Tools / Optional</h2>

     <b>Design Thinking Workflow</b>

       <img
          className="content-image"
          src= "/targetx-interactive/public/designthinking.jpg"
          title= "Design Thinking"
          alt="Design Thinking"
            
         
          style={{width:"300px"}}
          />
     <br />

     <b> Image Generation</b>
     <br />
         <iframe
            src="https://react-image-creator-2.pages.dev/"

            title="External Content"
              width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
 
</div>
  );
}