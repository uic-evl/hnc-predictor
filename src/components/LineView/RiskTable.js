
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
                        <th style={{width:'8%'}}><div id="thDiv">{h}y</div></th>

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
                                    {topic[i]}
                                </td>
                                {
                                    head.map(h=>{                                     
                                        // console.log(right)
                                        let index = time.indexOf(h)
                                        console.log(h)
                                        // console.log(index)
                                        // console.log(d[index])
                                        let val = d[0][index] * 100
                                        val = val.toFixed(2);
                                        if(window.innerHeight <= 750){
                                            if(h === 5){
                                                return(
                                                    <td><div style={{position:'absolute', right:"56.75%"}}>{val}%</div></td>
                                                )

                                            }else if(h === 6){
                                                return(
                                                    <td><div style={{position:'absolute', right:"52.5%"}}>{val}%</div></td>
                                                )
                                            }else if(h === 7){
                                                return(
                                                    <td><div style={{position:'absolute', right:"48.5%"}}>{val}%</div></td>
                                                )
                                            }else if(h === 8){
                                                return(
                                                    <td><div style={{position:'absolute', right:"44.5%"}}>{val}%</div></td>
                                                )
                                            }else if(h === 9){
                                                return(
                                                    <td><div style={{position:'absolute', right:"40%"}}>{val}%</div></td>
                                                )
                                            }else{
                                                return(
                                                    <td><div>{val}%</div></td>
                                                )
                                            }

                                        }else{
                                            return(
                                                <td><div>{val}%</div></td>
                                            )
                                        }                                        
                                        
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