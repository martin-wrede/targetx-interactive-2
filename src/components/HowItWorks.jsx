import React, { useContext } from 'react';
import Gallery from './Gallery';
 
import { Context } from '../Context';

export default function HowItWorks() {
  
  const { data } = useContext(Context);

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
        <h1> How it works</h1>
        
<h2>   
          AI Accountability Agents </h2>
          
           um Sie zu motivieren, Ihre Ziele zu erreichen 


     <ol>
      <li>
 Geben Sie Ihre Idee ein
      </li>
      <li>
        Erhalten Sie eine Aanalyse
      </li>
      <li>
        Sie erhalten einen für Ihren persönlichen Termin optimierten Plan

      </li>
      <li>
        Täglich motiviert werden</li>
         
<li>Erreichen Sie Ihre Ziele  </li> 
</ol> 
{/* 
 Die meisten Menschen scheitern nicht an ihrer Produktivität, sondern daran, emotional mit ihren Zielen verbunden zu bleiben. AccountabilityAI ist ein KI-Coach für 19 $/Monat, der wie ein kleiner James Clear in Ihrer Tasche funktioniert. Er meldet sich täglich bei Ihnen, feuert Sie an und mahnt Sie sanft, wenn Sie abzuschweifen beginnen. Im Gegensatz zu Aufgaben-Apps verfolgt er nicht nur Ihre Fortschritte, sondern lernt Ihre Muster, versteht, was Sie motiviert, und behält Ihre Ziele im Auge, auch wenn niemand sonst zusieht. Für Fernarbeiter, die sich nach Schwung und Bedeutung sehnen, ist es die Struktur hinter ihren Ambitionen.
Ich würde dies ausbauen, indem ich mich direkt an die ehrgeizbesessene Ecke des Internets wende... Indie-Hacker, Produktivitäts-YouTuber, Kohorten-Kurs-Junkies und Solo-Gründer, die bereits James Clear gelesen und fünf ungelesene Notion-Vorlagen über Ziele haben. Beginnen Sie damit, es zu einer Bewegung zu machen, nicht zu einem Produkt: „ein Mini-James-Clear für die Hosentasche“, ‚eine KI, die sich darum kümmert, ob du deine Ziele erreichst‘. Zeigen Sie Check-Ins, Siege und echte Fortschritts-Screenshots.
Verschaffen Sie sich eine frühe Traktion durch Schöpfer (Ali Abdaal, Thomas Frank, Tiago Forte-Style) via Rev Share Deal, sie haben Vertrauen und Reichweite. Bauen Sie eine Gemeinschaft auf, die sich um die Momentum Streaks kümmert, nicht nur um die Zielverfolgung. Nutzen Sie öffentliche Verantwortungsschleifen (wöchentliche Fortschrittsberichte, die auf X geteilt werden, Mini-Ranglisten in Slack-Gruppen), um eine virale Bindung zu schaffen. Sobald die individuelle Ebene gefestigt ist, erweitern Sie sie auf Teams: „Geben Sie Ihrem Team einen KI-Coach, der ihnen hilft, persönliche Ziele zu erreichen, die tatsächlich passen.
*/}
<br/>
   
          
  	  

          {/*
 Es gibt zahlreiche Daten und Studien, die belegen, 
 dass der Einsatz von KI-Tools die Projektlaufzeiten in der Softwareentwicklung
 , insbesondere bei Prototypen und Apps, erheblich verkürzen und den benötigten
  Personalaufwand reduzieren kann. <br/>Die Einschätzung, dass dies von Monaten mit einem ganzen Team auf Wochen mit 1-2 Personen reduziert werden kann, wird durch die Forschung gestützt.
   */}     
  </div>
      </div>
   
      <div id="sidebar" className="content_sub">
           <img
          className="content-image"
          src= "/targetx-interactive/public/howitworks.png"
          title= "How it works"
          style={{width:"300px"}}
          
          />
  	      
        <br />
        <br />
          
        {/*
        
        {data[3] &&  <img src={`${data[3].sidebar_image}`} />}
         */}
        <br />
        <br />
      </div>
      
    </div>
  );
}