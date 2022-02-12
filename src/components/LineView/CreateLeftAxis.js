import { AxisLeft } from "./AxisLeft"

export const CreateLeftAxis = ({
    xScale,
    yScale,
    yAxisLabelOffset,
    yAxisLabel,
    scaleOffset,
    innerHeight
}) => {
    return (
        <>
            <AxisLeft 
                xScale={xScale}
                yScale = {yScale}
                // innerWidth={innerWidth}
                scaleOffset = {scaleOffset}
            />
            
            <text
                className='axis-label'       
                textAnchor='middle'
                transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2} )rotate(-90)`}
            >{yAxisLabel}</text>
        </>
    )
}