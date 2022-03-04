export const CreateLegends = ({
    onHover,
    clnames,
    hoverOut,
    innerWidth,
    innerHeight,
    margin,
    legendOffset,
    legendSize,
    color,
    textPaddingX,
    textPaddingY,
    legend,
    i
}) => {
    return(
        <g
            className='legend'
            transform={`translate(0, ${innerHeight - margin.bottom})`}
            onMouseEnter={() => onHover(clnames[i])}
            onMouseOut = {() => hoverOut()}
        >
            <rect
                x = {(margin.right)}
                y = {legendOffset * i - 10}
                width = {legendSize}
                height = {legendSize}
                fill = {color(i)}
            />
            <text
                x = {textPaddingX + (margin.right)}
                y = {textPaddingY + (legendOffset * i) - 10}
            >
                {`${legend[i]}`}
            </text>

        </g>
    )
}