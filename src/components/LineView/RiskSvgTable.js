import React from "react";
import { line, scaleLinear, scaleOrdinal } from "d3"
import { Col, Table } from "react-bootstrap"
import './RiskSvgTable.css'

const padX = 82
const padY = 30
const padX2 = 20
const strokeWidth = 1
const padW = 3
const padH = 8
const scaleOffset = 2
const off = 10
export const RiskSvgTable = ({
    head,
    topic,
    time,
    data,
    color,
    xScale,
    yScale,
    textScale,
    mar,
    lineHeight,
    onHover,
    hoverOut,
    clnames
}) =>{
    const [xStart, xEnd] = xScale.range();
    const [, yEnd] = yScale.range();
    const ticks = xScale.ticks();
    // const textticks = textScale.ticks();

    // console.log(textticks)
    // let storeXX = 0
    // x1={x + padY - scaleOffset} 
    // x={xStart - padX - off} 

    let w = (xScale(ticks[0]) + padY + 2) - (xStart - padX - off)

    
    const [xxStart, xxEnd] = textScale.range()

    return (
        // <svg width="100%" height="100%" viewBox="0 0 370 160">

            <g id='rowGroup' transform={`translate(0, ${mar})`} role="table">
                {
                    topic.map((tt, j) =>{
                        const xx = textScale(j)    
                        // storeXX = xx                     
                        // console.log(j, xx)
                        return(
                            <>
                            <rect 
                                x={xStart - padX - off} 
                                y={xx - padY} 
                                width={w} 
                                height={lineHeight + padH}
                                fill={"white"}
                                onMouseEnter={() => onHover(clnames[j])}
                                onMouseOut={() => hoverOut()}
                            />
                            <line 
                                x1={xStart - padX - off} 
                                x2={xEnd + padX2 + padH} 
                                y1={xx - padY} 
                                y2={xx - padY}  
                                stroke={'black'} 
                                strokeWidth={strokeWidth}
                            />
                            <text x={xStart} y={xx} fontSize='1em' textAnchor='middle' role="row"> 
                                {

                                    head.map((t, i) => {
                                        // if(t !== 10){
                                            const x = xScale(i);
                                            if(i === 0){
                                                return(
                                                    <tspan
                                                    x={x - padX2 - 10}
                                                    role='cell'
                                                    stroke="black"
                                                    strokeWidth={0.5}
                                                    onMouseEnter={() => onHover(clnames[j])}
                                                    onMouseOut={() => hoverOut()}
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
                            </>
                        )
                    })
                    }   
                                
                <line 
                    x1={xStart - padX - off} 
                    x2={xEnd + padX2 + padH} 
                    y1={xxEnd + padH + lineHeight - padY} 
                    y2={xxEnd + padH + lineHeight - padY}  
                    stroke={'black'}
                    strokeWidth={strokeWidth}
                /> 
                <g>
                    <line 
                            x1={xStart + padY + scaleOffset + off} 
                            x2={xStart + padY + scaleOffset + off} 
                            y1={xxEnd + padH + lineHeight + 2 - padY} 
                            y2={xxEnd + padH + lineHeight + off - padY}
                            stroke={'black'}
                            strokeWidth={strokeWidth * 1.5}
                        />
                    <line 
                        x1={xEnd + padX2} 
                        x2={xEnd + padX2} 
                        y1={xxEnd + padH + lineHeight + 2 - padY} 
                        y2={xxEnd + padH + lineHeight + off - padY}
                        stroke={'black'}
                        strokeWidth={strokeWidth * 1.5}
                    />
                    <line 
                        x1={xStart + padY + scaleOffset + off} 
                        x2={xEnd + padX2 } 
                        y1={xxEnd + padH + lineHeight + off - padY} 
                        y2={xxEnd + padH + lineHeight + off - padY}  
                        stroke={'black'}
                        strokeWidth={strokeWidth * 1.5}
                    /> 
                    <line 
                        x1={xScale(4) + padY - scaleOffset} 
                        x2={xScale(4) + padY - scaleOffset} 
                        y1={xxEnd + padH + lineHeight + off - padY} 
                        y2={xxEnd + padH + lineHeight - 10 }
                        stroke={'black'}
                        strokeWidth={strokeWidth * 1.5}
                    />

                    <text
                        className='axis-label'
                        x={xScale(5) - 15}
                        y={xxEnd + padH + lineHeight + 7}
                        textAnchor='middle'
                    >{`Overall Survival Probability (%)`}</text>
                </g>
                {/* <rect x='25' y='40' width='310' height='20' fill='gainsboro'/>
                <rect x='25' y='76' width='310' height='20' fill='gainsboro'/> */}                

                <g>
                    <line 
                        x1={- xStart - padX - off + padW} 
                        x2={- xStart - padX - off + padW} 
                        y1={xxStart - padY} 
                        y2={xxEnd + padH + lineHeight - padY}
                        stroke={'black'}
                        strokeWidth={strokeWidth}
                    />
                    {ticks.map((t, i) => {
                        const x = xScale(t);
                        if( i === 0){
                            return (
                                <React.Fragment key={i}>
                                    <line 
                                        x1={x + padY + scaleOffset} 
                                        x2={x + padY + scaleOffset} 
                                        y1={xxStart - padY} 
                                        y2={xxEnd + padH + lineHeight - padY}
                                        stroke={'black'}
                                        strokeWidth={strokeWidth}
                                    />
                                </React.Fragment>
                                );

                        }else{
                            return (
                                <React.Fragment key={i}>
                                    <line 
                                        x1={x + padY - scaleOffset} 
                                        x2={x + padY - scaleOffset} 
                                        y1={xxStart - padY} 
                                        y2={xxEnd + padH + lineHeight - padY}
                                        stroke={'black'}
                                        strokeWidth={strokeWidth}
                                    />
                                </React.Fragment>
                                );
                        }
                            
                    })}
                </g>

            </g>
            // </svg>
    )
}