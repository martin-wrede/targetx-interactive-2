import React, { useContext,  useRef, useEffect, useState} from 'react';
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

     style={{
        position: 'relative',   // oder absolute, je nach deinem Layout
        top: 40,
        left: 0,
        width: '100vw',
        height: '80vh', // calc('100vh' - '40'),     // volle Browserhöhe
        border: 'none',      // oder dein gewünschter Rahmen
      //  overflow: 'hidden'   // verhindert innere Scrollbars
      }}
     // scrolling="no"
    />
       
       <br />
         <br />
         
</div>
  );
}