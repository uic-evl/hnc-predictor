import React, { useState } from "react"
import { Form, Col, Row, InputGroup, FormControl, Button, Image} from "react-bootstrap"
import * as d3 from 'd3'
import './Stratification.css'

let placeholder = 'https://raw.githubusercontent.com/nafiul-nipu/lanet-interface/master/src/images/OS/OS_LT5_UT20.jpg'
// let perc = null;
// let risk = null;
export const Stratification = ({
    lowRef,
    upRef,
    risk,
    perc,
    riskCalculation,
    riskRef
}) =>{
    const [imgSrc, setImgSrc] = useState(placeholder);

    const onButtonClick = () =>{
        riskCalculation()
        handleChange()
    }

    const handleChange = () =>{
        console.log(riskRef.current.value)
        console.log(upRef.current.value)
        console.log(lowRef.current.value)

        let folder = riskRef.current.value;
        let lower = lowRef.current.value;
        let upper = upRef.current.value;

        let imageUrl = `https://raw.githubusercontent.com/nafiul-nipu/lanet-interface/master/src/images/${folder}/OS_LT${lower}_UT${upper}.jpg`;

        setImgSrc(imageUrl)
    }


    return (
        <Col className='strat' md='4' id="stratback" style={
            {marginLeft:"1%", width:"31%"}}>
            <Row>
                {/* <Col md='10' id="back"> */}
                    <h4 className='d-flex justify-content-center'>Model-based Stratification</h4>
                    <Row>
                    <Form.Group controlId="formGridState" id='selects'>
                        <Form.Label>Select Risk Prediction</Form.Label>
                        <Form.Select defaultValue="OS" ref={riskRef} onChange={handleChange}  style={{fontSize: '0.9em'}}>
                        <option value='OS'> Overall Survival (OS) </option>
                        <option value='LC'> Local Control (LC) </option>
                        <option value='RC'> Regional Control (RC) </option>
                        </Form.Select>
                    </Form.Group>
                    </Row>
                    <Row>
                        <InputGroup size="sm" className="mb-3" id="inputs">
                            <InputGroup.Text id="basic-addon1">Low-risk threshold</InputGroup.Text>
                            <FormControl
                            aria-label="lower"
                            aria-describedby="basic-addon1"
                            id="lowRef"
                            ref={lowRef}
                            defaultValue={5}
                            />
                            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                        </InputGroup>
                    </Row>
                    
                    <Row>
                        <InputGroup size="sm" className="mb-3" id="inputs">
                            <InputGroup.Text id="basic-addon2">High-risk threshold</InputGroup.Text>
                            <FormControl
                            aria-label="upper"
                            aria-describedby="basic-addon2"
                            id="upRef"
                            ref={upRef}
                            defaultValue={20}
                            />
                            <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                        </InputGroup>
                    </Row>
                    
                    <Button variant="primary" 
                        size="sm"
                        onClick={onButtonClick}
                        style={{width: '15%', marginLeft: '56%'}}
                    >
                        Submit
                    </Button>
                {/* </Col> */}
            </Row>
            <Row className='survivalImage'>
                <Image src={imgSrc} id='imageid'/>
            </Row>
            {
                risk !== null && 
                <Row style={{marginLeft: '31%'}}>
                    <p><b>New Patient has: </b></p>
                    <p><b>{risk}</b> mortality risk ({perc}%)</p>
                </Row>

            }
        </Col>
    )
}