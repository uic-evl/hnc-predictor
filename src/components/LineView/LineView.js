import { Col } from "react-bootstrap"

import { scaleLinear, scaleOrdinal } from "d3"

import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"
import { LinePlot } from "./LinePlot"


const width = 800
const height = 500

const margin = {top:20, right:30, bottom:65, left:90} 

const xAxisLabelOffset = 50
const yAxisLabelOffset = 40

const xAxisLabel = 'Time (years)'
const yAxisLabel = 'Overall Survival'

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
        .domain([0,data.length])
        .range(["red", "black"])

    return(
    <Col className="linePlot" md="8">
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

            {data.map((pred, i) => (
                <LinePlot 
                    data={pred}
                    xScale = {xScale}
                    yScale = {yScale}
                    color={color(i)}
                    time={time}
                /> 

            ))}
            </g>
        </svg>
    </Col>
)
}