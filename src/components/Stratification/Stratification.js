import React, { useState } from "react"
import { Col, Row, InputGroup, FormControl, Button, Image} from "react-bootstrap"
import * as d3 from 'd3'

let placeholder = 'https://raw.githubusercontent.com/nafiul-nipu/lanet-interface/master/src/images/placeholder.png'
let perc = null;
export const Stratification = ({
    yrIndex,
    data
}) =>{
    let [risk, setRisk] = useState(null)

    let lowRef = React.createRef()
    let upRef = React.createRef()

    const onButtonClick = () => {
        let val = data[yrIndex] * 100
        val = val.toFixed(2);
    
        let mortality = 100 - val;
        perc = mortality

        let low = lowRef.current.value;
        console.log(low)

        let up = upRef.current.value;
        console.log(up)

        if (mortality < low){
            setRisk('Low')
        }else if(mortality >= low && mortality <= up){
            setRisk('Intermediate')
        }else{
            setRisk('High')
        }

    }


    return (
        <Col className='strat' md='5'>
            <Row>
                <h4 className='d-flex justify-content-center'>Stratification</h4>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Lower mortality risk</InputGroup.Text>
                    <FormControl
                    aria-label="lower"
                    aria-describedby="basic-addon1"
                    ref={lowRef}
                    />
                    <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">Upper mortality risk</InputGroup.Text>
                    <FormControl
                    aria-label="upper"
                    aria-describedby="basic-addon2"
                    ref={upRef}
                    />
                    <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                </InputGroup>
                <Button variant="primary" 
                    onClick={onButtonClick}
                >
                    Submit
                </Button>
            </Row>
            <Row>
                <Image src={placeholder} fluid />
            </Row>
            {
                risk !== null && 
                <Row>
                    <p>New Patient has: </p>
                    <p>{risk} mortality risk ({perc}%)</p>
                </Row>

            }
        </Col>
    )
}