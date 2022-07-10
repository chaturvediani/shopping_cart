import React from 'react'
import { useState,useEffect} from 'react';

export default function TableData2(props) {
  const API_URL="http://localhost:8000/order";
const[data,setData]=useState([])
    const fetchOrders = () => {
        fetch(`${API_URL}`)
            .then(res => res.json())
            .then(json => setData(json));
    }
    useEffect(() => {
        fetchOrders();
    }, []);

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
const[pro_name,setPro_name]=useState(null)
const[quantity,setQuantity]=useState(null)
    const [amount, setAmount] = useState(null);
    const onEdit = ({pro_id, currentPro_name,currentQuantity,currentAmount}) => {
        setInEditMode({
            status: true,
            rowKey: pro_id
        })
        setPro_name(currentPro_name)
        setQuantity(currentQuantity)
        setAmount(currentAmount);
    }

    const updateOrders = ({pro_id,newPro_name,newQuantity, newAmount}) => {
        fetch(`${API_URL}/${pro_id}`, {
            method: "PATCH",
            body: JSON.stringify({
                pro_name:newPro_name,
                quanity:newQuantity,
                amount: newAmount
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                onCancel();

                fetchOrders();
            })
    }

    
    const onSave = ({pro_id, newPro_name,newQuantity,newAmount}) => {
        updateOrders({pro_id, newPro_name,newQuantity,newAmount});
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        setPro_name(null)
        setQuantity(null)
        setAmount(null);
    }


return(
<div className="container">
            <h1>Table</h1>
            <table>
                <thead>
                <tr>
                    <th>ProductId</th>
                    <th>CustomerId</th>
                    <th>Pro_name</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody >
                    {
                        data.map((item,key) => { 
                         return(
                            <tr key={key}>
                                <td>{item.pro_id}</td>
                                <td>{item.cust_id}</td>
                                <td>{inEditMode.status && inEditMode.rowKey === item.pro_id ? (
                                        <input value={pro_name}
                                               onChange={(event) => setPro_name(event.target.value)}
                                        />
                                    ) : (
                                        item.pro_name
                                    )}</td>
                                <td >{inEditMode.status && inEditMode.rowKey === item.pro_id ? (
                                        <input value={quantity}
                                               onChange={(event) => setQuantity(event.target.value)}
                                        />
                                    ) : (
                                        item.quantity
                                    )}</td>
                                <td >{
                                    inEditMode.status && inEditMode.rowKey === item.pro_id ? (
                                        <input value={amount}
                                               onChange={(event) => setAmount(event.target.value)}
                                        />
                                    ) : (
                                        item.amount
                                    )
                                }</td>
                                <td> {
                                    inEditMode.status && inEditMode.rowKey === item.pro_id ? (
                                        <React.Fragment>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave({pro_id: item.pro_id, newPro_name:pro_name,newQuantity:quantity,newAmount: amount})}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                        </React.Fragment>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({pro_id: item.pro_id,currentPro_name:item.pro_name,currentQuantity:item.quantity, currentAmount: item.amount})}
                                        >
                                            Edit
                                        </button>
                                    )
                                }</td>
                                <td/>
                            </tr>
                                )
                        }
                        )
                    }
                </tbody>
            </table>
        </div>
    );


              }