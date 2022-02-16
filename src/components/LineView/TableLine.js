import React from "react";
import './TableLine.css'
export const TableLine = ({
    width,
    margin,
    xScale, 
    yScale, 
    scaleOffset, 
    innerHeight,
    dotOffset,
    lineHeight
}) => {
    const [xStart, xEnd] = xScale.range();
    const [, yEnd] = yScale.range();
    const ticks = xScale.ticks();
    // if(window.innerHeight <= 750){
    //     // normal laptop
    //     height = window.innerHeight - (window.innerHeight / 1.6)
    // }else{
    //     height = window.innerHeight - (window.innerHeight / 1.35)

    // } 
    // console.log(window.innerHeight)
    return (
        <g transform={`translate(0, ${innerHeight + dotOffset})`}>
                    <g className="ticks">
                        {ticks.map((t, i) => {
                            if(t !== 0){
                                const x = xScale(t);
                                return (
                                <React.Fragment key={i}>
                                    <line x1={x} x2={x} y1={yEnd} y2={yEnd + lineHeight} id='tbl'/>
                                    <text
                                    x={x}
                                    y={yEnd + lineHeight + scaleOffset * 5}
                                    >
                                    {t}
                                    </text>
                                </React.Fragment>
                                );
                            }
                            
                        })}
                    </g>

        </g>

    );
}