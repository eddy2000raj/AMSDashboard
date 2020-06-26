import React, { useState, useEffect,useRef } from 'react';
import properties from './queriesConfig';
import axios from 'axios';
import ReactLoader from "./loader" ;

const API_URL=`${[process.env.REACT_APP_API_URL]}` ;

const ReactTile= (props)=> {

   const [resp, setGitData] = useState({ p1: null, p2: null});

	useEffect(() => {

    const fetchRequest=async (form) => {

        const fetchRequest=await axios({
                  method: 'post',
                  url: API_URL,
                  data: form
        });

        const responseJSON=await fetchRequest.data;

      return responseJSON;
    }

    const fetchData = async () => {

      let p1Data=await fetchRequest(props.p);
      let p2Data=await fetchRequest(props.last);
      setGitData({ p1: p1Data,p2:p2Data });
    };

    fetchData();
  }, []);

	if (resp.p1) {

	 return (<div className="card card-stats">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-5 col-md-5">
                                        <div class="icon-big icon-danger text-center text-danger">
                                            <i class="ti-ticket"></i>
                                        </div>
                                    </div>
                                    <div class="col-7 col-md-7">
                                        <div class="numbers ">
                                            <p class="card-category">Priority {props.priorty}</p>
                                            <p  class="card-title" id="P1Tile"> {resp.p1}</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="card-footer">
                                    <hr />
                                    <div class="stats">
                                        <i class="ti-timer"></i> <span id="P1Tile24">{resp.p2} </span> new SR's in the last 24 hours
                                    </div>
                            </div>
                        </div>)
         }

         return  <ReactLoader />;     

    }



export default ReactTile ;