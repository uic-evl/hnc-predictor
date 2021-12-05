import { useRef , useEffect} from "react"
import { Col, Row, InputGroup, FormControl, Button} from "react-bootstrap"
import * as d3 from 'd3'

let height, width;
export const Stratification = () =>{
    const stratR = useRef(null)
     // useEffect will run on stageCanvasRef value assignment
     useEffect( () => {

        // The 'current' property contains info of the reference:
        // align, title, ... , width, height, etc.
        if(stratR.current){

            height = stratR.current.offsetHeight;
            width  = stratR.current.offsetWidth;
        }

    }, [stratR]);
    console.log(height, width)
    return (
        <Col className='strat' md='5' ref={stratR}>
            <Row>
                <h4 className='d-flex justify-content-center'>Stratification</h4>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Lower mortality risk</InputGroup.Text>
                    <FormControl
                    aria-label="lower"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Upper mortality risk</InputGroup.Text>
                    <FormControl
                    aria-label="upper"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Button variant="primary" >
                    Submit
                </Button>
            </Row>
            <Row></Row>
            <Row>
                
            </Row>
        </Col>
    )
}