
import { Col, Table } from "react-bootstrap"
import './RiskTable.css'

export const RiskTable = ({
    head,
    topic,
    time,
    data,
    color
}) =>{
    // console.log(data)
    return (
        <Table striped hover size="sm">
            <thead className="t-head">
                <tr>
                <th style={{width:"11%"}}></th>
                {
                    head.map(h =>(
                        <th style={{width:'8%'}}>{h}y</th>

                    ))
                }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d,i) =>{
                        console.log(topic[i])
                        return(
                            <tr style={{backgroundColor:color(i),
                                color:'white'
                            }}>
                                <td>
                                    <div></div>
                                    {topic[i]}
                                </td>
                                {
                                    head.map(h=>{
                                        let index = time.indexOf(h)
                                        // console.log(d)
                                        // console.log(index)
                                        // console.log(d[index])
                                        let val = d[0][index] * 100
                                        val = val.toFixed(2);
                                        return(
                                            <td>{val}%</td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}