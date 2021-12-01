import React from 'react';
import './App.css';


import {Container, Row} from 'react-bootstrap'

import {post} from 'axios'
import {useState } from 'react';

import {FormView} from './components/FormView'
import {LineView} from './components/LineView/LineView'

function App() {
  const ageRef = React.createRef();
  const perfScoreRef = React.createRef();
  const packRef = React.createRef();
  const siteRef = React.createRef();
  // let tlcRef = "T4";
  let tRef = "T4";
  let nRef = "N2";
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
  }
  const onNChange = (event) =>{
    nRef = event.target.value;
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
      'http://127.0.0.1:8080/backend',
      {data:val}
    ).then((response) => {
      // console.log("connection created")
      console.log(response.data)
        setPrediction(response.data)
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
        />
        {/* <LineView 
          data={prediction}
        /> */}
      </Row>
    </Container>
    );
    
  }


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
      />
      <LineView 
        data={prediction}
      />
    </Row>
  </Container>
  );
}

export default App;
