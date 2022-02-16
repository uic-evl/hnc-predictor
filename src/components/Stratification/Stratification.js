import React, { useState } from "react"
import { AiFillQuestionCircle } from "react-icons/ai"
import { Form, Col, Row, InputGroup, FormControl, Button, Image, Modal} from "react-bootstrap"
import * as d3 from 'd3'
import './Stratification.css'

let placeholder = 'https://raw.githubusercontent.com/nafiul-nipu/lanet-interface/master/src/images/OS/OS_LT5_UT20.jpg'
// let perc = null;
// let risk = null;
export const Stratification = ({
    lowRef,
    upRef,
    // overallRisk,
    // overallPerc,
    // localRisk,
    // localPerc,
    // regionalRisk,
    // regionalPerc,
    patientClass,
    riskCalculation,
    riskRef
}) =>{
    // console.log(patientClass)
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [riskShow, setriskShow] = useState(false);

    const handleriskClose = () => setriskShow(false);
    const handleriskShow = () => setriskShow(true);

    return (
        <Col className='strat' md='4' id="stratback" style={
            {marginLeft:"1%", width:"31%"}}>
            <Row>
                {/* <Col md='10' id="back"> */}
                    <h4 className='d-flex justify-content-center'>Model-based Stratification</h4>
                    <Row>
                    <Form.Group controlId="formGridState" id='selects'>
                        <Form.Label id="riskFormLabel">Select risk-thresholds <AiFillQuestionCircle onClick={handleShow}/></Form.Label>
                        <Form.Select defaultValue="OS" ref={riskRef} onChange={handleChange}  style={{fontSize: '0.9em'}}>
                        <option value='OS'> Overall Survival (OS) </option>
                        <option value='LC'> Local Control (LC) </option>
                        <option value='RC'> Regional Control (RC) </option>
                        </Form.Select>
                    </Form.Group>
                    </Row>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Select risk-thresholds</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Please select the 2-year risk you select as threshold for 
                            low- and high-risk mortality, local and/or regional failure (n.b. these are the inverse of the survival/control
                             risk displayed in the graph).<br/>
                             The default low- and high-risk thresholds are 5% and 25%, which are determined 
                             on the large-scale dataset, refer to [link_to_paper]
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>




                    <Row>
                        <InputGroup size="sm" id="inputs">
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
                        <InputGroup size="sm" id="inputs">
                            <InputGroup.Text id="basic-addon2">High-risk threshold</InputGroup.Text>
                            <FormControl
                            aria-label="upper"
                            aria-describedby="basic-addon2"
                            id="upRef"
                            ref={upRef}
                            defaultValue={25}
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
                <AiFillQuestionCircle />
                <Image src={imgSrc} id='imageid'/>
            </Row>
            {
                patientClass !== null && 
                <Row style={{marginLeft: '0%'}}>
                    <p><b>The current patient is classified as: <AiFillQuestionCircle onClick={handleriskShow}/> </b> <br/>
                    <b>{patientClass.overallRisk}-risk</b> for mortality (2y risk = {patientClass.overallPerc}%) <br/>
                    <b>{patientClass.localRisk}-risk</b> for local tumor failure (2y risk = {patientClass.localPerc}%) <br/>
                    <b>{patientClass.regionalRisk}-risk</b> for regional tumor failure (2y risk = {patientClass.regionalPerc}%)</p>


                    <Modal show={riskShow} onHide={handleriskClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Current Patient Classification</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>This classification is dependent on the thresholds
                             inputted in the top of this panel
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleriskClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </Row>

            }
        </Col>
    )
}