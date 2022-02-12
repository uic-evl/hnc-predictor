import { AxisBottom } from "./AxisBottom"
export const CreateBottomAxis = ({
    xScale,
    yScale,
    innerHeight,
    innerWidth,
    xAxisLabelOffset,
    xAxisLabel,
    scaleOffset
}) => {
    return(
        <>
            <AxisBottom 
                xScale ={xScale}
                yScale = {yScale}
                scaleOffset = {scaleOffset}
                innerHeight={innerHeight}
            />

            <text
                className='axis-label'
                x={innerWidth / 2}
                y={innerHeight + xAxisLabelOffset}
                textAnchor='middle'
            >{xAxisLabel}</text>
        </>
    )
}