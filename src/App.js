import './App.css';

import {Container, Row, Col, Form, Button} from 'react-bootstrap'

import {post} from 'axios'
import { useEffect, useState } from 'react';

import {FormView} from './components/FormView'

function App() {
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


  const handleButtonClick = () =>{
    console.log("i am clicked")
    post(
      'http://127.0.0.1:5000/backend',
      {data:defaultVal}
    ).then((response) => {
      console.log("connection created")
      console.log(response.data)
        setPrediction(response.data)
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <Container fluid>
    <Row>
      <FormView onButtonClick={handleButtonClick}/>
      <Col className="linePlot" md="6"></Col>
    </Row>
  </Container>
  );
}

export default App;
