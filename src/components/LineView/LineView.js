import { Col, Row, Button, Modal } from "react-bootstrap"
import {AiFillQuestionCircle} from 'react-icons/ai'

import { useState } from "react"

import { scaleLinear, scaleOrdinal } from "d3"

import * as d3 from 'd3'

import { CreateBottomAxis } from "./CreateBottomAxis"
import { CreateLeftAxis } from "./CreateLeftAxis"
import { CreateLinePlots } from "./CreateLinePlots"

import { RiskTable } from "./RiskTable"
import { RiskSvgTable } from "./RiskSvgTable"
import { TableLine } from "./TableLine"





const width = window.innerWidth / 2
const svgheight = window.innerHeight
const height = window.innerHeight / 1.75

const margin = {top:20, right:30, bottom:65, left:90} 

const xAxisLabelOffset = 50
const yAxisLabelOffset = 40

const xAxisLabel = 'Time (years)'
const yAxisLabel = 'Predicted Risk (%)'

const legend = ['Overall Survival', "Local Control", "Regional Control"]
const clnames = ['overall', 'local', 'region']

const textPaddingX = 15
const textPaddingY = 10

const legendSize = 10
const legendOffset = 20

const scaleOffset = 5
const dotOffset = 30

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const LineView = ({data, time}) => {
    
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right


    // console.log(years)
    // console.log(time)

    // console.log(time)
    const xScale = scaleLinear()
    .domain([0, 10])
    .range([0, innerWidth])
    // .nice()

    const yScale = scaleLinear()
        .domain([0, 1])
        .range([innerHeight, 0])
        // .nice()


    const color = scaleOrdinal()
        .domain([0, 1])
        .range(["#984ea3", "#377eb8", '#d95f02'])

    const onHover = (val) => {
        // console.log(val)
        d3.selectAll('#line-plot').style('opacity', 0.2)
        d3.select(`.${val}`).style('opacity', 1)
        
    }

    const hoverOut = () => {
        d3.selectAll('#line-plot').style('opacity', 1)
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return(
    <Col className="linePlot" md="6" id="outback">
        <Row>
            <Col md='12' style={{paddingLeft:'0px'}}>
                <h4 className='d-flex justify-content-center'>Outcome Prediction <AiFillQuestionCircle onClick={handleShow}/></h4>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Outcome Prediction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>The outcome curves are based on the clinical models developed and validated 
                        on an international dataset &#62; 4500 patients [link_to_paper]
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

                <svg width={width} height={svgheight}>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>

                        <CreateBottomAxis 
                            xScale={xScale}
                            yScale={yScale}
                            innerHeight={innerHeight}
                            innerWidth={innerWidth}
                            xAxisLabelOffset={xAxisLabelOffset}
                            xAxisLabel={xAxisLabel}
                            scaleOffset={scaleOffset}
                        />

                        <CreateLeftAxis 
                            xScale={xScale}
                            yScale={yScale}
                            yAxisLabelOffset={yAxisLabelOffset}
                            yAxisLabel={yAxisLabel}
                            scaleOffset={scaleOffset}
                            innerHeight={innerHeight}
                        />

                        <CreateLinePlots 
                            data={data}
                            clnames={clnames}
                            xScale={xScale}
                            yScale={yScale}
                            color={color}
                            time={time}
                            onHover={onHover}
                            hoverOut={hoverOut}
                            innerWidth={innerWidth}
                            margin = {margin}
                            legendOffset={legendOffset}
                            legendSize={legendSize}
                            textPaddingX={textPaddingX}
                            textPaddingY={textPaddingY}
                            legend={legend}
                        />

                        <TableLine 
                            width={width}
                            margin={margin}
                            xScale ={xScale}
                            yScale = {yScale}
                            scaleOffset = {5}
                            innerHeight={innerHeight}
                            dotOffset = {dotOffset}
                        />
                    </g>                    
                </svg>
            </Col>
        
        </Row>
        <Row>
            <Col md='12' style={{paddingLeft:'0px'}}>
            {/* <TableLine 
                    width={width}
                    margin={margin}
                    xScale ={xScale}
                    yScale = {yScale}
                    scaleOffset = {5}
                    innerHeight={innerHeight}
                /> */}

                <RiskTable
                    head={years}
                    topic ={legend}
                    time={time}
                    data={data}
                    color={color}
                />

                {/* <RiskSvgTable /> */}
            </Col>            
        </Row>
    </Col>
)
}