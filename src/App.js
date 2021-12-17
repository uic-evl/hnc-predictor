import React from 'react';
import './App.css';


import {Container, Row} from 'react-bootstrap'

import {post} from 'axios'
import {useState } from 'react';

import {FormView} from './components/FormView'
import {LineView} from './components/LineView/LineView'
import { Stratification } from './components/Stratification/Stratification';

let stage_new = null
let stage_new_7th  = null

const createArrayRange = (start, end, step) => {
  let result = []
  for (let i = start; i < end; i = i + step) {
      result.push(+i.toFixed(1));
  }
  return result;
}

const time = Array.from(createArrayRange(0,10,0.1))

const yearIndex = time.indexOf(2)

function App() {
  const ageRef = React.createRef();
  const perfScoreRef = React.createRef();
  const packRef = React.createRef();
  const siteRef = React.createRef();
  // let tlcRef = "T4";
  let tRef = "T4";
  let nRef = "N2c";
  const hpvRef = React.createRef();

  const defaultVal = {
    "AGE": ">75",
    "Performance_score": "0",
    "pack_years": ">50",
    "site" : "Hypopharynx",
    "T_stage_LC" : "T4",
    "T_stage" : "T4",
    "N_stage" : "N2",
    "HPV.P16.status" : "Positive"
  };

  const [prediction, setPrediction] = useState(null)

  // const onTLChange = (event) =>{
  //   tlcRef = event.target.value;
  // }

  const onTChange = (event) =>{
    tRef = event.target.value;
    // console.log(tRef)
  }
  const onNChange = (event) =>{
    nRef = event.target.value;
    // console.log(nRef)
  }


  const handleButtonClick = () =>{
    console.log("i am clicked")
    let val = {
      "AGE": ageRef.current.value,
      "Performance_score": perfScoreRef.current.value,
      "pack_years": packRef.current.value,
      "site" : siteRef.current.value,
      // "T_stage_LC" : tlcRef,
      "T_stage" : tRef,
      "N_stage" : nRef,
      "HPV.P16.status" : hpvRef.current.value
    }
    // console.log(defaultVal)
    // console.log(val)
    post(
      // 'http://131.193.78.149:8080/backend',
      'http://127.0.0.1:8080/backend',
      {data:val}
    ).then((response) => {
      // console.log("connection created")
      console.log(response.data[0])

      stage_new = response.data[0]
      stage_new_7th = response.data[1]

      let predData = [response.data[2], response.data[3], response.data[4]]

      setPrediction(predData)

    }).catch((error) => {
      console.log(error)
    });
  }
  if(!prediction){
    return (
      <Container fluid>
      <Row>
        <FormView 
          onButtonClick={handleButtonClick}
          ageRef={ageRef}
          perfScoreRef = {perfScoreRef}
          packRef = {packRef}
          siteRef = {siteRef}
          // tlcRef = {onTLChange}
          tRef = {onTChange}
          nRef = {onNChange}
          hpvRef = {hpvRef}
          stage = {stage_new}
          stage7 = {stage_new_7th}
        />
      </Row>
    </Container>
    );
    
  }


  return (
    <Container fluid className='contain'>
    <Row>
      <FormView
        onButtonClick={handleButtonClick}
        ageRef={ageRef}
        perfScoreRef = {perfScoreRef}
        packRef = {packRef}
        siteRef = {siteRef}
        // tlcRef = {onTLChange}
        tRef = {onTChange}
        nRef = {onNChange}
        hpvRef = {hpvRef}
        stage = {stage_new}
        stage7 = {stage_new_7th}
      />
      <LineView 
        data={prediction}
        time={time}
      />
      <Stratification
        yrIndex = {yearIndex}
        data ={prediction[2][0]}
      />
    </Row>
  </Container>
  );
}

export default App;
