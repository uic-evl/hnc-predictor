import React, { useEffect } from 'react';
import './App.css';

import * as d3 from 'd3';

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
let tRef = "T4";
let nRef = "N2c";

function App() {
  const size = useWindowResize();
  const ageRef = React.createRef();
  const perfScoreRef = React.createRef();
  const packRef = React.createRef();
  const siteRef = React.createRef();
  // let tlcRef = "T4";
  // let tRef = "T4";
  // let nRef = "N2c";
  const hpvRef = React.createRef();

  const riskRef = React.createRef();

  let lowRef = React.createRef()
  let upRef = React.createRef()

  // const defaultVal = {
  //   "AGE": ">75",
  //   "Performance_score": "0",
  //   "pack_years": ">50",
  //   "site" : "Hypopharynx",
  //   "T_stage_LC" : "T4",
  //   "T_stage" : "T4",
  //   "N_stage" : "N2",
  //   "HPV.P16.status" : "Positive"
  // };

  const [prediction, setPrediction] = useState(null)

  const [patientClass, setPatientClass] = useState(null)

  // const [overallRisk, setOverallRisk] = useState(null);
  // const [overallPerc, setOverallPerc] = useState(null);

  // const [localRisk, setLocalRisk] = useState(null);
  // const [localPerc, setLocalPerc] = useState(null);

  // const [regionalRisk, setRegionalRisk] = useState(null);
  // const [regionalPerc, setRegionalPerc] = useState(null);

  // const onTLChange = (event) =>{
  //   tlcRef = event.target.value;
  // }

  const riskCalculation = () => {
    let riskValues = {}
    if(prediction){
      // console.log(d3.select('#lowRef').node().value)
      let low, up;
      if(lowRef.current === null){
        low = d3.select('#lowRef').node().value
        up = d3.select('#upRef').node().value
      }else{
        low = lowRef.current.value;  
        up = upRef.current.value;     
  
      }
  
      // console.log(low)
      // console.log(up)
  
  
      // console.log(prediction)
      // console.log(prediction[1][0])
      let overallSurv = prediction[0][0]
  
      let twoYearOverall = overallSurv[yearIndex] * 100
      // twoYear = twoYear.toFixed(2);
  
      let overallMortality = Math.round(100 - twoYearOverall);
  
      if (overallMortality < low){
          // setOverallRisk('Low')
          // risk = 'Low'
          riskValues.overallRisk = 'Low'
      }else if(overallMortality >= low && overallMortality <= up){
          // setOverallRisk('Intermediate')
          // risk = 'Intermediate'
          riskValues.overallRisk = 'Intermediate'
      }else{
          // setOverallRisk('High')
          // risk = 'High'
          riskValues.overallRisk = 'High'
      }
  
      // setOverallPerc(overallMortality.toFixed(2))
      // riskValues.overallPerc = overallMortality.toFixed(2)
      riskValues.overallPerc = overallMortality
  
      let localServ = prediction[1][0]
  
      let twoYearLocal = localServ[yearIndex] * 100
      // twoYear = twoYear.toFixed(2);
  
      let localMortality = Math.round(100 - twoYearLocal);
  
      if (localMortality < low){
          // setLocalRisk('Low')
          // risk = 'Low'
          riskValues.localRisk = 'Low'
      }else if(localMortality >= low && localMortality <= up){
          // setLocalRisk('Intermediate')
          // risk = 'Intermediate'
          riskValues.localRisk = 'Intermediate'
      }else{
          // setLocalRisk('High')
          // risk = 'High'
          riskValues.localRisk = 'High'
      }
  
      // setLocalPerc(localMortality.toFixed(2))
      // riskValues.localPerc = localMortality.toFixed(2)
      riskValues.localPerc = localMortality

      let regionalSurv = prediction[2][0]
  
      let twoYearRegional = regionalSurv[yearIndex] * 100
      // twoYear = twoYear.toFixed(2);
  
      let regionalMortality = Math.round(100 - twoYearRegional);
  
      if (regionalMortality < low){
          // setRegionalRisk('Low')
          // risk = 'Low'
          riskValues.regionalRisk = 'Low'
      }else if(regionalMortality >= low && regionalMortality <= up){
          // setRegionalRisk('Intermediate')
          // risk = 'Intermediate'
          riskValues.regionalRisk = 'Intermediate'
      }else{
          // setRegionalRisk('High')
          // risk = 'High'
          riskValues.regionalRisk = 'High'
      }
  
      // setRegionalPerc(regionalMortality.toFixed(2))
      // riskValues.regionalPerc = regionalMortality.toFixed(2)
      riskValues.regionalPerc = regionalMortality;
      // console.log('up', up)
      // console.log('low', low)
      // console.log('risk', risk)
      // console.log('mortality', mortality)
      // console.log('twoYear', twoYear)

      setPatientClass(riskValues)
    }

}


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
      'https://risk-calculator.evl.uic.edu:8080/backend',
      // 'http://127.0.0.1:8080/backend',
      {data:val}
    ).then((response) => {
      // console.log("connection created")
      // console.log(response.data)

      stage_new = response.data[0]
      stage_new_7th = response.data[1]

      let predData = [response.data[2], response.data[3], response.data[4]]

      setPrediction(predData)

      // riskCalculation()

    }).catch((error) => {
      console.log(error)
    });

  }

  useEffect(() => {
    riskCalculation();
  }, [prediction])



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
          riskCalculation={riskCalculation}
        />
      </Row>
    </Container>
    );
    
  }


  return (
    <Container fluid className='contain' >
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
        riskCalculation={riskCalculation}
      />
      <LineView 
        data={prediction}
        time={time}
        windowHeight={size.height}
        windowWidth={size.width}
      />
      <Stratification
        // yrIndex = {yearIndex}
        // data ={prediction[2][0]}
        riskCalculation={riskCalculation}
        // overallRisk={overallRisk}
        // overallPerc={overallPerc}
        // localRisk={localRisk}
        // localPerc={localPerc}
        // regionalRisk={regionalRisk}
        // regionalPerc={regionalPerc}
        patientClass = {patientClass}
        lowRef={lowRef}
        upRef={upRef}
        riskRef = {riskRef}
      />
    </Row>
  </Container>
  );
}


function useWindowResize(){
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default App;
