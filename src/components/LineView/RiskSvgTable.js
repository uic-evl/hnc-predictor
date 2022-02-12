
import { Col, Table } from "react-bootstrap"
import './RiskSvgTable.css'

export const RiskSvgTable = ({

}) =>{
    // console.log(data)
    return (
        <svg width="100%" height="100%" viewBox="0 0 370 160">

            <g id='rowGroup' transform='translate(0, 0)' role="table">
                <rect x='25' y='40' width='310' height='20' fill='gainsboro'/>
                <rect x='25' y='76' width='310' height='20' fill='gainsboro'/>

                <text x='30' y='30' font-size='5px' font-weight='bold' fill='crimson' text-anchor='middle' role="row">
                
                <tspan  role="columnheader" x='60'>Expenses</tspan>
                <tspan role="columnheader" x='90'>Net</tspan>

                <tspan role="columnheader" x='120'>Sales</tspan>
                <tspan  role="columnheader" x='150'>Expenses</tspan>
                <tspan role="columnheader" x='180'>Net</tspan>

                <tspan role="columnheader" x='210'>Sales</tspan>
                <tspan  role="columnheader" x='240'>Expenses</tspan>
                <tspan role="columnheader" x='270'>Net</tspan>

                <tspan role="columnheader" x='300'>Sales</tspan>
                <tspan  role="columnheader" x='330'>Expenses</tspan>
                <tspan role="columnheader" x='360'>Sales</tspan>
                
                </text>

                <text x='30' y='30' font-size='5px' text-anchor='middle' role="row">
                <tspan role="rowheader" x='30' dy='1.5em' font-weight='bold' fill='crimson' text-anchor='start'>Q1</tspan>
                <tspan role="cell" x='60'>$ 195</tspan>
                <tspan role="cell" x='90'>$ 28</tspan>

                <tspan role="cell" x='120'>$ 223</tspan>
                <tspan role="cell" x='150'>$ 195</tspan>
                <tspan role="cell" x='180'>$ 28</tspan>

                <tspan role="cell" x='210'>$ 223</tspan>
                <tspan role="cell" x='240'>$ 195</tspan>
                <tspan role="cell" x='270'>$ 28</tspan>

                <tspan role="cell" x='300'>$ 223</tspan>
                <tspan role="cell" x='330'>$ 195</tspan>
                <tspan role="cell" x='360'>$ 195</tspan>
               
                </text>

                <text x='30' y='30' font-size='5px' text-anchor='middle' role="row">
                <tspan role="rowheader" x='30' dy='2.5em' font-weight='bold' fill='crimson' text-anchor='start'>Q2</tspan>
        
                <tspan role="cell" x='60'>$ 70</tspan>
                <tspan role="cell" x='90'>$ 113</tspan>

                <tspan role="cell" x='120'>$ 183</tspan>
                <tspan role="cell" x='150'>$ 70</tspan>
                <tspan role="cell" x='180'>$ 113</tspan>

                <tspan role="cell" x='210'>$ 183</tspan>
                <tspan role="cell" x='240'>$ 70</tspan>
                <tspan role="cell" x='270'>$ 113</tspan>

                <tspan role="cell" x='300'>$ 183</tspan>
                <tspan role="cell" x='330'>$ 70</tspan>
                <tspan role="cell" x='360'>$ 183</tspan>

                </text>

                <text x='30' y='30' font-size='5px' text-anchor='middle' role="row">
                <tspan role="rowheader" x='30' dy='3.5em' font-weight='bold' fill='crimson' text-anchor='start'>Q3</tspan>
                
                <tspan role="cell" x='60'>$ 88</tspan>
                <tspan role="cell" x='90'>$ 189</tspan>

                <tspan role="cell" x='120'>$ 277</tspan>
                <tspan role="cell" x='150'>$ 88</tspan>
                <tspan role="cell" x='180'>$ 189</tspan>

                <tspan role="cell" x='210'>$ 277</tspan>
                <tspan role="cell" x='240'>$ 88</tspan>
                <tspan role="cell" x='270'>$ 189</tspan>

                <tspan role="cell" x='300'>$ 277</tspan>
                <tspan role="cell" x='330'>$ 88</tspan>
                <tspan role="cell" x='360'>$ 277</tspan>

                </text>
            </g>
            </svg>
    )
}