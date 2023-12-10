import React, { useEffect } from 'react';
import './App.css';

import * as d3 from 'd3';

import { Col, Container, Row } from 'react-bootstrap'

import axios from 'axios';
import { useState } from 'react';

import { FormView } from './components/FormView'
import { LineView } from './components/LineView/LineView'
import { Stratification } from './components/Stratification/Stratification';

let stage_new = null
let stage_new_7th = null

const createArrayRange = (start, end, step) => {
  let result = []
  for (let i = start; i < end; i = i + step) {
    result.push(+i.toFixed(1));
  }
  return result;
}

const time = Array.from(createArrayRange(0, 10, 0.1))

const yearIndex = time.indexOf(2)
let tRef = "T4";
let nRef = "N2c";

function App() {
  const size = useWindowResize();

  const ageRef = React.createRef();
  const perfScoreRef = React.createRef();
  const packRef = React.createRef();
  const siteRef = React.createRef();
  const hpvRef = React.createRef();
  const riskRef = React.createRef();

  let lowRef = React.createRef()
  let upRef = React.createRef()

  const [prediction, setPrediction] = useState(null)
  const [patientClass, setPatientClass] = useState(null)
  const [ajccStage, setAjccStage] = useState('III')

  const riskCalculation = () => {
    let riskValues = {}
    if (prediction) {
      // console.log(d3.select('#lowRef').node().value)
      let low, up;
      if (lowRef.current === null) {
        low = d3.select('#lowRef').node().value
        up = d3.select('#upRef').node().value
      } else {
        low = lowRef.current.value;
        up = upRef.current.value;

      }
      let overallSurv = prediction[0][0]
      let twoYearOverall = overallSurv[yearIndex] * 100
      let overallMortality = Math.round(100 - twoYearOverall);

      if (overallMortality < low) {
        riskValues.overallRisk = 'Low'
      } else if (overallMortality >= low && overallMortality <= up) {
        riskValues.overallRisk = 'Intermediate'
      } else {
        riskValues.overallRisk = 'High'
      }

      riskValues.overallPerc = overallMortality

      let localServ = prediction[1][0]
      let twoYearLocal = localServ[yearIndex] * 100
      let localMortality = Math.round(100 - twoYearLocal);

      if (localMortality < low) {
        riskValues.localRisk = 'Low'
      } else if (localMortality >= low && localMortality <= up) {
        riskValues.localRisk = 'Intermediate'
      } else {
        riskValues.localRisk = 'High'
      }

      riskValues.localPerc = localMortality

      let regionalSurv = prediction[2][0]
      let twoYearRegional = regionalSurv[yearIndex] * 100
      let regionalMortality = Math.round(100 - twoYearRegional);

      if (regionalMortality < low) {
        riskValues.regionalRisk = 'Low'
      } else if (regionalMortality >= low && regionalMortality <= up) {
        riskValues.regionalRisk = 'Intermediate'
      } else {
        riskValues.regionalRisk = 'High'
      }

      riskValues.regionalPerc = regionalMortality;

      setPatientClass(riskValues)
    }

  }
  const onTChange = (event) => {
    tRef = event.target.value;
    // console.log(tRef)
    updateAjccStage()
  }
  const onNChange = (event) => {
    nRef = event.target.value;
    // console.log(nRef)
    updateAjccStage()
  }


  const handleButtonClick = () => {
    console.log("i am clicked")
    let val = {
      "AGE": ageRef.current.value,
      "Performance_score": perfScoreRef.current.value,
      "pack_years": packRef.current.value,
      "site": siteRef.current.value,
      // "T_stage_LC" : tlcRef,
      "T_stage": tRef,
      "N_stage": nRef,
      "HPV.P16.status": hpvRef.current.value
    }
    axios.post(
      // 'https://risk-calculator.evl.uic.edu:8080/backend',
      // 'http://127.0.0.1:8080/backend',
      { data: val }
    ).then((response) => {

      stage_new = response.data[0]
      stage_new_7th = response.data[1]
      // console.log(stage_new)

      let predData = [response.data[2], response.data[3], response.data[4]]

      setPrediction(predData)

    }).catch((error) => {
      console.log(error)
    });

  }

  const updateAjccStage = () => {
    // console.log("update ajcc stage called")
    // console.log(tRef, nRef)
    // console.log([1].includes(1))
    let site = siteRef.current.value;
    let hpv = hpvRef.current.value;
    // console.log(site, hpv)
    if (site === 'OPC' && hpv === 'Positive') {
      if (['T0', 'T1', 'T2', 'Tx'].includes(tRef) && ['N0', 'N1', 'N2a-b'].includes(nRef)) {
        setAjccStage('I')
      } else if (['T0', 'T1', 'T2', 'Tx'].includes(tRef) && ['N2c'].includes(nRef)) {
        setAjccStage('II')
      } else if (['T3'].includes(tRef) && ['N0', 'N1', 'N2a-b', 'N2c'].includes(nRef)) {
        setAjccStage('II')
      } else if (['T4'].includes(tRef) || ['N3'].includes(nRef)) {
        setAjccStage('III')
      }
    } else if ((site === 'OPC' && hpv === 'Negative') || ["Oral Cavity", "Hypopharynx", "Larynx"].includes(site)) {
      if (['N3'].includes(nRef)) {
        setAjccStage('IVb')
      } else if (['T0', 'T1', 'Tx'].includes(tRef) && ['N0'].includes(nRef)) {
        setAjccStage('I')
      } else if (['T2'].includes(tRef) && ['N0'].includes(nRef)) {
        setAjccStage('II')
      } else if (['T1', 'T2', 'Tx'].includes(tRef) && ['N1'].includes(nRef)) {
        setAjccStage('III')
      } else if (['T3'].includes(tRef) && ['N0', 'N1'].includes(nRef)) {
        setAjccStage('III')
      } else if (['T4'].includes(tRef) || ['N2a-b', 'N2c'].includes(nRef)) {
        setAjccStage('IVa')
      }
    } else if (site === 'Nasopharynx') {
      if (['T0', 'T1', 'Tx'].includes(tRef) && ['N0'].includes(nRef)) {
        setAjccStage('I')
      } else if (['T0', 'T1', 'Tx'].includes(tRef) && ['N1'].includes(nRef)) {
        setAjccStage('II')
      } else if (['T2'].includes(tRef) && ['N0', 'N1'].includes(nRef)) {
        setAjccStage('II')
      } else if (['T0', 'T1', 'Tx'].includes(tRef) && ['N2a-b', 'N2c'].includes(nRef)) {
        setAjccStage('III')
      } else if (['T2', 'T3'].includes(tRef) && ['N2a-b', 'N2c'].includes(nRef)) {
        setAjccStage('III')
      } else if (['T3'].includes(tRef) && ['N0', 'N1'].includes(nRef)) {
        setAjccStage('III')
      } else if (['T4'].includes(tRef) || ['N3'].includes(nRef)) {
        setAjccStage('IVa')
      }
    } else if (site === 'unknown_primary') {
      if (['N1', 'N2a-b'].includes(nRef)) {
        setAjccStage('III')
      } else if (['N2c'].includes(nRef)) {
        setAjccStage('IVa')
      } else if (['N3'].includes(nRef)) {
        setAjccStage('IVb')
      }
    }
  }
  useEffect(() => {
    riskCalculation();
  }, [prediction])



  if (!prediction) {
    return (
      <Container fluid>
        <Row>
          {/* <FormView
            onButtonClick={handleButtonClick}
            ageRef={ageRef}
            perfScoreRef={perfScoreRef}
            packRef={packRef}
            siteRef={siteRef}
            // tlcRef = {onTLChange}
            tRef={onTChange}
            nRef={onNChange}
            hpvRef={hpvRef}
            stage={ajccStage}
            stageUpdate={updateAjccStage}
            riskCalculation={riskCalculation}
          /> */}
          <Col md="10" className='d-flex justify-content-center align-items-center'>
            <h1>This app is moved to a new address </h1>
            <h2> <a href="http://risk-calculator.evl.uic.edu:3000/">http://risk-calculator.evl.uic.edu</a> </h2>
          </Col>
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
          perfScoreRef={perfScoreRef}
          packRef={packRef}
          siteRef={siteRef}
          // tlcRef = {onTLChange}
          tRef={onTChange}
          nRef={onNChange}
          hpvRef={hpvRef}
          stage={ajccStage}
          stageUpdate={updateAjccStage}
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
          patientClass={patientClass}
          lowRef={lowRef}
          upRef={upRef}
          riskRef={riskRef}
        />
      </Row>
    </Container>
  );
}


function useWindowResize() {
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
