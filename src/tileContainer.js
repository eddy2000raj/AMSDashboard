import React, { useState, useEffect,Suspense } from 'react';
import properties from './queriesConfig';

const ReactTile = React.lazy(() => import('./tile'));

//import ReactTile from "./tile" ;

 const TileContainer=()=> {

      const form1=properties.createRequestParams(properties.p1tile,"text","");
      const form12=properties.createRequestParams(properties.p124tile,"text","");

      const form2=properties.createRequestParams(properties.p2tile,"text","");
      const form22=properties.createRequestParams(properties.p224tile,"text","");

      const form3=properties.createRequestParams(properties.p3tile,"text","");
      const form32=properties.createRequestParams(properties.p324tile,"text","");

      const form4=properties.createRequestParams(properties.p4tile,"text","");
      const form42=properties.createRequestParams(properties.p424tile,"text","");
 

    return (<Suspense fallback={<div>Loading...</div>}>  <div class="row">
                    <div class="col-lg-3 col-md-12 col-12">
                        <ReactTile p={form1} last={form12} priorty={1}/>
                    </div>
                     <div class="col-lg-3 col-md-12 col-12">
                        <ReactTile p={form2} last={form22} priorty={2}/>
                    </div>
                     <div class="col-lg-3 col-md-12 col-12">
                        <ReactTile p={form3} last={form32} priorty={3}/>
                    </div>
                     <div class="col-lg-3 col-md-12 col-12">
                        <ReactTile p={form4} last={form42} priorty={4}/>
                    </div>
                   
                </div> 
            </Suspense>);
  
}



export default TileContainer ;
