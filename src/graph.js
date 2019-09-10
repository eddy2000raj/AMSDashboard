import React, { Component } from 'react';

import NVD3Chart from "react-nvd3";
//import d3 from "d3";

class Graph extends Component{
  render() {
    let series = [{
      "key": "Serie1",
      "values": [{
        "x": 0,
        "y": 0
      }, {
        "x": 1,
        "y": 1
      }, {
        "x": 2,
        "y": 2
      }],
      "color": "#ff7f0e"
    }, {
      "key": "Serie2",
      "values": [{
        "x": 0,
        "y": 0
      }, {
        "x": 2,
        "y": 1
      }, {
        "x": 3,
        "y": 1
      }],
      "color": "#2ca02c"
    }];

    var datum = [{
          key: "Cumulative Return",
          values: [
            {
              "label" : "A" ,
              "value" : -29.765957771107
            } ,
            {
              "label" : "B" ,
              "value" : 0
            } ,
            {
              "label" : "C" ,
              "value" : 32.807804682612
            } ,
            {
              "label" : "D" ,
              "value" : 196.45946739256
            } ,
            {
              "label" : "E" ,
              "value" : 0.19434030906893
            } ,
            {
              "label" : "F" ,
              "value" : -98.079782601442
            } ,
            {
              "label" : "G" ,
              "value" : -13.925743130903
            } ,
            {
              "label" : "H" ,
              "value" : -5.1387322875705
            }
          ]
        }
      ];

    return ( 
      <div>
        <p>Loading {series.length} series!</p>
        <NVD3Chart type="discreteBarChart" datum={datum} x="label" y="value"
                    useInteractiveGuideline={true}
                    containerStyle={{ height: "500px" }}/>  
      </div>
      );
  }

}

export default Graph ;