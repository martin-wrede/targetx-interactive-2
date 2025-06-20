import React, { useContext } from 'react';
import Gallery from './Gallery';
import Roadmap from './Roadmap'; 
import { Context } from '../Context';


export default function Planner() {
  const { data } = useContext(Context);

// Sample data based on your example
const myRoadmapData = [
  {
    date: '2025-06-17',
    task: 'Write value proposition: What transformation does the reader get?',
    motivation: 'Exchange of drinks'
  },
  {
    date: '2025-06-18',
    task: 'Research 3 competitor landing pages and note what works.',
    motivation: 'Call some friends'
  },
  {
    date: '2025-06-19',
    task: 'Brainstorm page sections: Hero, About, Book Preview, Testimonials, Buy CTA.',
    motivation: 'Watch the movie about Steve Jobs'
  },
  {
    date: '2025-06-20',
    task: 'Write draft copy for each section (keep it concise + benefit-focused).',
    motivation: 'Get an ice cream'
  }
];
  return (
 <div>
      <h1>Try the Planner</h1>
<br/>
Persönliche Daten: (fließen aktuell nicht in den Prompt mit ein)
     <br />     <br />


Geburtsjahr:
<br />
  <input></input>
     <br />     <br />

  Aktueller Wohnort / Land: 
     <br />    

   <input></input>

     <br />     <br />  <br />
 
  <b>1 Welches Haupt-Problem willst du lösen?</b>
      <br />
  <input></input>

     <br />     <br />
 <b>2 Welche Lösung siehst Du dafür?</b>

   <br />
  <input></input>
   <br /> <br />
  <b>3 In welchem Zeitraum willst Du das Ergebnis fertig haben?</b>
   <br />  
  <input></input>
     <br /> <br />
  <b>4 Welche Art von Ergebnis erwartest Du?</b>
  <br/>
    (Prototyp, fertiges Endprodukt)
   <br />  

  <input ></input>

     <br /> <br />
   <submit>submit</submit>
  
    <br /> <br />
  
      <h2> 1 Business Idea Input</h2>

            <iframe
            src="https://react-image-chatbot.pages.dev/"

            title="External Content"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>

       <h2>2 Generate Plan</h2>

        
        <Roadmap 
          roadmapData={myRoadmapData}
          />
       
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