import React from "react";
import { scaleLinear, scaleOrdinal } from "d3"
import { Col, Table } from "react-bootstrap"
import './RiskSvgTable.css'



export const RiskSvgTable = ({
    head,
    topic,
    time,
    data,
    color,
    width,
    xScale,
    yScale,
    textScale,
    mar
}) =>{
    const [xStart, xEnd] = xScale.range();
    const [, yEnd] = yScale.range();
    // const ticks = xScale.ticks();
    // const textticks = textScale.ticks();

    // console.log(textticks)

    return (
        // <svg width="100%" height="100%" viewBox="0 0 370 160">

            <g id='rowGroup' transform={`translate(0, ${mar})`} role="table">
                {
                    topic.map((tt, j) =>{
                        const xx = textScale(j)
                        console.log(j, xx)
                        return(
                            <text x={xStart} y={xx} font-size='1em' text-anchor='middle' role="row"> 
                                {

                                    head.map((t, i) => {
                                        // if(t !== 10){
                                            const x = xScale(i);
                                            if(i === 0){
                                                return(
                                                    <tspan
                                                    x={x}
                                                    role='cell'
                                                    >
                                                    {tt}
                                                    </tspan>

                                                )
                                            }else{
                                                // console.log(t)
                                                let index = time.indexOf(t)
                                                let datum = data[j][0]
                                                let val = datum[index] * 100
                                                val = Math.round(val)
                                                return (
                                                    <React.Fragment key={i}>
                                                        <tspan
                                                            x={x}
                                                            role='cell'
                                                        >
                                                        {val}
                                                        </tspan>
                                                    </React.Fragment>
                                                );

                                            }
                                            
                                        // }
                                        
                                    })

                                }                            
                            </text>
                        )
                    })
                    }                
                
                {/* <rect x='25' y='40' width='310' height='20' fill='gainsboro'/>
                <rect x='25' y='76' width='310' height='20' fill='gainsboro'/> */}

            </g>
            // </svg>
    )
}