 

import React, {  useContext } from 'react';


import { Context } from '../Context';


export default  function PlannerApp() {
  const { aiData } = useContext(Context);

  
  return (
    <div>
       
             <h2>{aiData?.app_Headline1}</h2>
      test
    </div>
  )
  }