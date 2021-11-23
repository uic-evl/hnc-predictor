import { curveNatural, line } from "d3";

export const LinePlot = ({
    classVal,
    data, 
    xScale, 
    yScale, 
    color,
    time 
    }) => {
        // console.log("in line plot")
        // console.log(data[0])
        return(
        <g className='mark'> 
            <path 
                className = {classVal}
                id = "line-plot"
                fill="none"
                stroke={color}
                d={line()
                    .x((d,i) => {
                        // console.log("line plot d")
                        // console.log(d)
                        return xScale(time[i])
                    })
                    .y((d,i) => {
                        // console.log("line plot i")
                        // console.log(time[i])
                        return yScale(d)
                    })
                    // .curve(curveNatural)
                    (data[0])}
            />
        </g>
    )};