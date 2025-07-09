import React, { useContext } from 'react';
import Gallery from './Gallery';

import { Context } from '../Context';


export default function Planner() {
  const { data } = useContext(Context);
  const {lang} = useContext(Context);
    const { language } = useContext(Context); // ❌ This returns `undefined`
  

 

 
  return (
 <div>
    
  
    
  

            <iframe
            src={`https://react-chatbot-air-prompt-2.pages.dev/?part2=none&lang=${language}`}

            title="External Content"
            width="100%"
             height="100%"
          //  height="600"

          style={{
   // position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    border: 'none',
  }}
           
           // style={{ border: '1px solid #ccc' }}
          ></iframe>

       
       <br />
         <br />
         
</div>
  );
}