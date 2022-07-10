import React from 'react'
import { useState,useEffect} from 'react';

export default function TableData(props) {
  const API_URL="http://localhost:8000/customer";
const[data,setData]=useState([])
    const fetchCustomers = () => {
        fetch(`${API_URL}`)
            .then(res => res.json())
            .then(json => setData(json));
    }
    useEffect(() => {
        fetchCustomers();
    }, []);

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
const[name,setName]=useState(null)
const[place,setPlace]=useState(null)
    const [address, setAddress] = useState(null);
    const onEdit = ({cust_id, currentName,currentPlace,currentAddress}) => {
        setInEditMode({
            status: true,
            rowKey: cust_id
        })
        setName(currentName)
        setPlace(currentPlace)
        setAddress(currentAddress);
    }

    const updateCustomers = ({cust_id,newName,newPlace, newAddress}) => {
        fetch(`${API_URL}/${cust_id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name:newName,
                place:newPlace,
                address: newAddress
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                fetchCustomers();
            })
    }

    
    const onSave = ({cust_id, newName,newPlace,newAddress}) => {
        updateCustomers({cust_id, newName,newPlace,newAddress});
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        setName(null)
        setPlace(null)
        setAddress(null);
    }


return(
<div className="container">
            <h1>Table</h1>
            <table>
                <thead>
                <tr>
                    <th>CustomerId</th>
                    <th>Name</th>
                    <th>Place</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody >
                    {
                        data.map((item,key) => { 
                         return(
                            <tr key={key}>
                                <td>{item.cust_id}</td>
                                <td>{inEditMode.status && inEditMode.rowKey === item.cust_id ? (
                                        <input value={name}
                                               onChange={(event) => setName(event.target.value)}
                                        />
                                    ) : (
                                        item.name
                                    )}</td>
                                <td >{inEditMode.status && inEditMode.rowKey === item.cust_id ? (
                                        <input value={place}
                                               onChange={(event) => setPlace(event.target.value)}
                                        />
                                    ) : (
                                        item.place
                                    )}</td>
                                <td >{
                                    inEditMode.status && inEditMode.rowKey === item.cust_id ? (
                                        <input value={address}
                                               onChange={(event) => setAddress(event.target.value)}
                                        />
                                    ) : (
                                        item.address
                                    )
                                }</td>
                                <td> {
                                    inEditMode.status && inEditMode.rowKey === item.cust_id ? (
                                        <React.Fragment>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave({cust_id: item.cust_id, newName:name,newPlace:place,newAddress: address})}
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
                                            onClick={() => onEdit({cust_id: item.cust_id,currentName:item.name,currentPlace:item.place, currentAddress: item.address})}
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
