
import React, { useContext } from 'react';
import Gallery from './Gallery';
 
import { Context } from '../Context';

 
export default function About(){
 const {data} = useContext(Context)
  
  let content = null
  if (data[7] && data[7].content_chapter) {
    content = data[7].content_chapter.map((chapter, index) => (
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
  
  <div className="content_container" id="main">
    <div className="content_main" id="content">

      {content}
    
     
          <p>targetx Medien-Design</p>
          <p>
            Martin Wrede
            <br />
            
          </p>
          <p>
            Kameruner Straße 49
            <br />
            13351 Berlin
            <br />
            Tel: 030-78084990
            <br />
            mail:{" "}
            <a
              title="E-Mail"
              href="mailto:%69%6E%66%6F%40%74%61%72%67%65%74%78%2E%64%65"
            >
              info@targetx.de
            </a>
          </p>

 
    
    <br/>
 
    <div   
    dangerouslySetInnerHTML={{ __html:data[7] && data[7].content_chapter[0].content_h2_text1}}
    >
    </div>

        </div>
      

    <div id="sidebar" className="content_sub">
       

      
      <br />
      <br />
      {data[7] && <img src={`${data[7].sidebar_image}`}
      title={`${data[7]. gallery_image_title}`}
       alt={`${data[7]. gallery_image_title}`}
          

      />}
          
      <br />
     
  	      
    </div>
  </div>
</div>

             );
           }
           