import { Col, Row } from "react-bootstrap"

import { scaleLinear, scaleOrdinal } from "d3"

import * as d3 from 'd3'

import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"
import { LinePlot } from "./LinePlot"
import { RiskTable } from "./RiskTable"


const width = 800
const height = 500

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

export const LineView = ({data}) => {
    
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const createArrayRange = (start, end, step) => {
        let result = []
        for (let i = start; i < end; i = i + step) {
            result.push(+i.toFixed(1));
        }
        return result;
    }

    const time = Array.from(createArrayRange(0,10,0.1))

    console.log(years)
    console.log(time)

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
        .range(["red", "black", 'green'])

    const onHover = (val) => {
        console.log(legend[val])
        d3.selectAll('#line-plot').style('opacity', 0.2)
        d3.select(`.${val}`).style('opacity', 1)
        
    }

    const hoverOut = () => {
        d3.selectAll('#line-plot').style('opacity', 1)
    }

    return(
    <Col className="linePlot" md="5">
        <Row>
            <Col md='12'>
                <h4 className='d-flex justify-content-center'>Output</h4>
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
            <Col md='12'>
                <RiskTable
                    head={years}
                    topic ={legend}
                    time={time}
                    data={data}
                />
            </Col>            
        </Row>
    </Col>
)
}