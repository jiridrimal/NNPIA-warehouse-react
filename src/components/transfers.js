import React, {useEffect} from "react";
import {useState} from "react";
import UserService from "../services/user";

export default function Transfers() {

    const [content, setContent] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);
        UserService.getDataAPI('transfer').then(json=>{
            setContent(json);
            setLoading(false);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    },[]);

    function changeStateHandler(id, value) {
        UserService.putDataAPI('transfer',undefined,"change-state/"+id+"/"+value,false).then(json=>{
            setLoading(false);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    return (
        <div>
            <h2>Transfers</h2>
            <div className={"container"}>
                {loading && "Loading..."}
                {error ? <h3 style={{color: "red"}}>{error}</h3>:<>
                    {content && (content.length===0 ? <div>Empty</div> :
                    <div><table style={{width:"100%"}}>
                        <thead><tr><td>Id</td><td>Address</td><td>Created</td><td>Crated by</td><td>Change status</td></tr></thead><tbody>
                            {content.map((transfer,transferIndex)=>
                            <React.Fragment key={transferIndex}>
                                <tr className={"row"}>
                                    <td>{transfer.id}</td>
                                    <td>{transfer.address}</td>
                                    <td>{transfer.created}</td>
                                    <td>{transfer.user.username}</td>
                                    <td>
                                        <select defaultValue={transfer.state} onChange={(e)=>changeStateHandler(transfer.id,e.target.value)}>
                                            <option value="PENDING">PENDING</option>
                                            <option value="DONE">DONE</option>
                                            <option value="CANCELED">CANCELED</option>
                                        </select>
                                    </td>
                                </tr><tr>
                                    <td colSpan={5}>
                                        <div className={"transfer-products"} style={{backgroundColor: "gray", display: "flex"}}>
                                            <div className={"transfer-details"} style={{fontWeight:"bold"}}><div>Name: </div><div>Amount: </div><div>Warehouse Id: </div></div>
                                            {transfer.transferItems.map((transferItem,index)=>
                                            <div key={index} className={"transfer-details"}>
                                                <div>{transferItem.product.productName}</div>
                                                <div>{transferItem.amount}</div>
                                                <div>{transferItem.product.warehouseId}</div>
                                            </div>)}
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>)}
                        </tbody>
                    </table></div>)}
                </>}
            </div>
        </div>
    );
}