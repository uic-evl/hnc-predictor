import { Col, Row } from "react-bootstrap"

import { scaleLinear, scaleOrdinal } from "d3"

import * as d3 from 'd3'

import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"
import { LinePlot } from "./LinePlot"
import { RiskTable } from "./RiskTable"
import { RiskSvgTable } from "./RiskSvgTable"
import { TableLine } from "./TableLine"


const width = window.innerWidth / 2
const height = window.innerHeight / 1.75

const margin = {top:20, right:30, bottom:65, left:90} 

const xAxisLabelOffset = 50
const yAxisLabelOffset = 40

const xAxisLabel = 'Time (years)'
const yAxisLabel = 'Predicted Risk'

const legend = ['Overall Survival', "Local Control", "Regional Control"]
const clnames = ['overall', 'local', 'region']

const textPaddingX = 15
const textPaddingY = 10

const legendSize = 10
const legendOffset = 20

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
        // console.log(legend[val])
        d3.selectAll('#line-plot').style('opacity', 0.2)
        d3.select(`.${val}`).style('opacity', 1)
        
    }

    const hoverOut = () => {
        d3.selectAll('#line-plot').style('opacity', 1)
    }

    return(
    <Col className="linePlot" md="6" id="outback">
        <Row>
            <Col md='12' style={{paddingLeft:'0px'}}>
                <h4 className='d-flex justify-content-center'>Outcome Prediction</h4>
                <svg width={width} height={height}>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                    
                    <AxisBottom 
                        xScale ={xScale}
                        yScale = {yScale}
                        scaleOffset = {5}
                        innerHeight={innerHeight}
                    />

                    <text
                        className='axis-label'
                        x={innerWidth / 2}
                        y={innerHeight + xAxisLabelOffset}
                        textAnchor='middle'
                    >{xAxisLabel}</text>

                    <AxisLeft 
                        xScale={xScale}
                        yScale = {yScale}
                        // innerWidth={innerWidth}
                        scaleOffset = {5}
                    />
                    
                    <text
                        className='axis-label'       
                        textAnchor='middle'
                        transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2} )rotate(-90)`}
                    >{yAxisLabel}</text>

                    {data.map((pred, i) =>{ 
                        // console.log(i)
                        // console.log(color(i))
                        return(
                        <>
                            <LinePlot 
                                key={i}
                                classVal={clnames[i]}
                                data={pred}
                                xScale = {xScale}
                                yScale = {yScale}
                                color={color(i)}
                                time={time}
                            />

                            <g
                                className='legend'
                                onMouseEnter={() => onHover(clnames[i])}
                                onMouseOut = {() => hoverOut()}
                            >
                                <rect
                                    x = {(innerWidth - margin.right - margin.left)}
                                    y = {legendOffset + legendOffset * i}
                                    width = {legendSize}
                                    height = {legendSize}
                                    fill = {color(i)}
                                />
                                <text
                                    x = {textPaddingX + (innerWidth - margin.right - margin.left)}
                                    y = {textPaddingY + (legendOffset + legendOffset * i)}
                                >
                                    {`${legend[i]}`}
                                </text>

                            </g>

                        </>

                    )})}
                    </g>
                </svg>
            </Col>
        
        </Row>
        <Row>
            <Col md='12' style={{paddingLeft:'0px'}}>
                <RiskTable
                    head={years}
                    topic ={legend}
                    time={time}
                    data={data}
                    color={color}
                />

                <TableLine 
                    width={width}
                    margin={margin}
                    xScale ={xScale}
                    yScale = {yScale}
                    scaleOffset = {5}
                    innerHeight={innerHeight}
                />



                {/* <RiskSvgTable /> */}
            </Col>            
        </Row>
    </Col>
)
}