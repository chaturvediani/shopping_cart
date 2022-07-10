import React from "react";
import { Container, Form, FloatingLabel, Button, Card } from "react-bootstrap";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
export default function Register() {
  
 const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const[place,setPlace]=useState("");
  const [address, setAddress] = useState("");
  const[id,setId]=useState(null);
  const[pro_id,setPro_id]=useState(null);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
 const [message,setMessage]=useState(null);
const [contact,setContact]=useState("")
  const onSubmitHandler =async(e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    }
    else{
         setMessage(null)
         try {
          const config={
            headers:{
              "Content-type":"application/json"
            }
          }
            const { data }= await axios.post("http://localhost:8000/customers",
            {name,place,address,id,pro_id},
            config
          )
          
          setLoading(false)
          localStorage.setItem("userInfo",JSON.stringify(data))
          navigate("/products")
          
         } catch (error) {
           console.log(error)
           setError(error.response.data.message)
         }
    }
    console.log("submitted");
  };

  return (
    <Container className="mt-5">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
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
          controlId="inputid"
          label="id"
          value={id}
          className="mb-3"
          onChange={(e)=>setId(e.target.value)}
        >
          <Form.Control type="id" placeholder="Enter Id" />
        </FloatingLabel>

        <FloatingLabel
          controlId="inputpro_id"
          label="pro_id"
          value={pro_id}
          className="mb-3"
          onChange={(e)=>setPro_id(e.target.value)}
        >
          <Form.Control type="pro_id" placeholder="Enter pro_id" />
        </FloatingLabel>

        <FloatingLabel
          controlId="inputPassword"
          label="Password"
          value={password}
          className="mb-3"
          onChange={(e)=>setPassword(e.target.value)}
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>

        <FloatingLabel
          controlId="inputPassword2"
          label="Confirm password"
          value={password}
          className="mb-3"
          onChange={(e)=>setConfirmPassword(e.target.value)}
        >
          <Form.Control type="password" placeholder="Confirm password" />
        </FloatingLabel>

        <FloatingLabel
          controlId="inputContact"
          label="Contact Number"
          value={contact}
          className="mb-3"
          onChange={(e)=>setContact(e.target.value)}
        >
          <Form.Control type="contact" placeholder="Enter Contact Number" />
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
        
        <br />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
}