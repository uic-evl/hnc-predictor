import { useRef , useEffect} from "react"
import { Col } from "react-bootstrap"
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
            Strat
        </Col>
    )
}