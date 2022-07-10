import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, FloatingLabel, Button, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import TableData from "./TableData";
import TableData2 from "./TableData2";
export default function Home(props) {
 const {products}=props;
  const [address, setAddress] = useState("");
  const[amount,setAmount]=useState(0);
  const[quantity,setQuantity]=useState(0)
  const[id,setId]=useState(null);
  const[pro_name,setPro_name]=useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
 const [message,setMessage]=useState(null);
const[showTable,setShowTable]=useState(false);
const[showTable2,setShowTable2]=useState(false);
const[custData,setCustData]=useState([]);
const[proData,setProData]=useState([]);
 let optionItems = products.map((product) =>
 <option key={product.id}>{product.name}</option>
);

 const idgenerator=()=>{
  var id = "";
  // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
  var p = "0123456789";

  for (var i = 0; i < 5; i++)
    id += p.charAt(Math.floor(Math.random() * p.length));

  return id;
}
var cust_id;
var pro_id;
 const onSubmitHandler =async(e) => {
  e.preventDefault();
   cust_id=idgenerator();
   pro_id=idgenerator();
       setMessage(null)
       try {
        const config={
          headers:{
            "Content-type":"application/json"
          }
        }
          const {data}= await axios.post("http://localhost:8000/customers",
          {cust_id,name,address,place},
          config
        )
        setCustData([data]);
        setLoading(false)
        setShowTable(true)
        
       } catch (error) {
         console.log(error)
         setError(error.response.data.message)
       }
       
       try {
        const config={
          headers:{
            "Content-type":"application/json"
          }
        }
          const { data }= await axios.post("http://localhost:8000/orders",
          {pro_id,pro_name,cust_id,quantity,amount},
          config
        )

        setProData([data]);
        setLoading(false)
        setShowTable2(true);
        
       } catch (error) {
         console.log(error)
         setError(error.response.data.message)
       }
      
  console.log("submitted");
};

// const onSubmitHandler2 =async(e) => {
//   e.preventDefault();
//   console.log("enetered")
//        setMessage(null)
//        try {
//         const config={
//           headers:{
//             "Content-type":"application/json"
//           }
//         }
//           const { data }= await axios.post("http://localhost:8000/orders",
//           {pro_name,cust_id,quantity,amount},
//           config
//         )
//         console.log(data)
//         setProData([data]);
//         setLoading(false)
//         setShowTable2(true);
        
//        } catch (error) {
//          console.log(error)
//          setError(error.response.data.message)
//        }
      
//   console.log("submitted");
// };

  return (
    <div>
    <Container align="left">
       <Form onSubmit={onSubmitHandler}>
        <FloatingLabel
          controlId="inputFullName"
          label="Full name"
          value={name}
          className="mb-3"
          onChange={(e)=>setName(e.target.value)}
        >
          <Form.Control type="name" placeholder="Enter full name" />
        </FloatingLabel>

        <FloatingLabel
          controlId="inputAddress"
          label="Address"
          value={address}
          className="mb-3"
          onChange={(e)=>setAddress(e.target.value)}
        >
          <Form.Control type="address" placeholder="Enter address" />
        </FloatingLabel>

        <FloatingLabel
          controlId="inputSelect"
          label="Select Place"
          value={place}
          className="mb-3"
          onChange={(e)=>setPlace(e.target.value)}
        >
          <Form.Select type="place" aria-label="Select place">
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
          </Form.Select>
        </FloatingLabel>
     
        <FloatingLabel
  controlId="inputpro_id"
  label="Select Product"
  value={pro_name}
  className="mb-3"
  onChange={(e)=>setPro_name(e.target.value)}
  >
  <Form.Select>{optionItems}</Form.Select>
  </FloatingLabel>

  <FloatingLabel
          controlId="inputQuantity"
          label="Quantity"
          value={quantity}
          className="mb-3"
          onChange={(e)=>setQuantity(e.target.value)}
        >
          <Form.Control type="quantity" placeholder="Enter quantity" />
        </FloatingLabel>

<FloatingLabel
          controlId="inputAmount"
          label="Amount"
          value={amount}
          className="mb-3"
          onChange={(e)=>setAmount(e.target.value)}
        >
          <Form.Control type="amount" placeholder="Enter amount" />
        </FloatingLabel>

        <Button type="submit" variant="primary" align="center">
          Submit
        </Button>
      </Form>
    </Container>

    {/* <Container align="right">
      <Form onSubmit={onSubmitHandler2}>
      <FloatingLabel
  controlId="inputpro_id"
  label="Select Product"
  value={pro_name}
  className="mb-3"
  onChange={(e)=>setPro_name(e.target.value)}
  >
  <Form.Select>{optionItems}</Form.Select>
  </FloatingLabel>

  <FloatingLabel
          controlId="inputQuantity"
          label="Quantity"
          value={quantity}
          className="mb-3"
          onChange={(e)=>setQuantity(e.target.value)}
        >
          <Form.Control type="quantity" placeholder="Enter quantity" />
        </FloatingLabel>

<FloatingLabel
          controlId="inputAmount"
          label="Amount"
          value={amount}
          className="mb-3"
          onChange={(e)=>setAmount(e.target.value)}
        >
          <Form.Control type="amount" placeholder="Enter amount" />
        </FloatingLabel>
      </Form>
      <Button type="submit" variant="primary" align="center">
          Submit
        </Button>
    </Container> */}
        {showTable && <TableData custData={custData} />}
        {showTable2 && <TableData2 proData={proData} />}
      
    </div>
  );
}
