
import { Col, Table } from "react-bootstrap"
import './RiskTable.css'

export const RiskTable = ({
    head,
    topic,
    time,
    data
}) =>{
    console.log(data)
    return (
        <Table striped bordered hover>
            <thead className="t-head">
                <tr>
                <th></th>
                {
                    head.map(h =>(
                        <th>{h}y</th>

                    ))
                }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d,i) =>{
                        return(
                            <tr>
                                <td>{topic[i]}</td>
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