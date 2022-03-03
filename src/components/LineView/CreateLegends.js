export const CreateLegends = ({
    onHover,
    clnames,
    hoverOut,
    innerWidth,
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
            onMouseEnter={() => onHover(clnames[i])}
            onMouseOut = {() => hoverOut()}
        >
            <rect
                x = {(innerWidth - margin.right - margin.left)}
                y = {legendOffset * i - 10}
                width = {legendSize}
                height = {legendSize}
                fill = {color(i)}
            />
            <text
                x = {textPaddingX + (innerWidth - margin.right - margin.left)}
                y = {textPaddingY + (legendOffset * i) - 10}
            >
                {`${legend[i]}`}
            </text>

        </g>
    )
}