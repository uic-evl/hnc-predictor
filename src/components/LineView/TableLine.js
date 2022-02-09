import React from "react";
import './TableLine.css'
export const TableLine = ({
    width,
    margin,
    xScale, 
    yScale, 
    scaleOffset, 
    innerHeight
}) => {
    const [xStart, xEnd] = xScale.range();
    const [, yEnd] = yScale.range();
    const ticks = xScale.ticks();
    const height = window.innerHeight - (window.innerHeight / 1.75) - 50
    return (
        <svg width={width} height={height} id="tableLine">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {/* <g transform={`translate(0, ${innerHeight})`}> */}
                    {/* <line className='axisLine' x1={xStart} x2={xEnd} y1={yEnd} y2={yEnd} /> */}
                    <g className="ticks">
                        {ticks.map((t, i) => {
                            if(t !== 10){
                                const x = xScale(t);
                                return (
                                <React.Fragment key={i}>
                                    <line x1={x} x2={x} y1={yEnd} y2={yEnd + height} id='tbl'/>
                                    {/* <text
                                    x={x}
                                    y={yEnd + scaleOffset * 5}
                                    >
                                    {t}
                                    </text> */}
                                </React.Fragment>
                                );
                            }
                            
                        })}
                    </g>
                {/* </g> */}

            </g>

        </svg>

    );
}