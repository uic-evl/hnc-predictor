import { LinePlot } from "./LinePlot"
import { CreateLegends } from "./CreateLegends"

export const CreateLinePlots = ({
    data,
    clnames,
    xScale,
    yScale,
    color,
    time,
    onHover,
    hoverOut,
    innerWidth,
    margin,
    legendOffset,
    legendSize,
    textPaddingX,
    textPaddingY,
    legend
}) => {
    return(
        data.map((pred, i) =>{ 
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
                    onHover={onHover}
                    hoverOut={hoverOut}
                />

                <CreateLegends 
                    onHover={onHover}
                    clnames={clnames}
                    hoverOut={hoverOut}
                    innerWidth={innerWidth}
                    margin={margin}
                    legendOffset={legendOffset}
                    legendSize={legendSize}
                    color={color}
                    textPaddingX={textPaddingX}
                    textPaddingY={textPaddingY}
                    legend={legend}
                    i={i}
                />

            </>

        )})
    )
}