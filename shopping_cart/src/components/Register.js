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
            {name,email,password,contact},
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
          controlId="inputEmail"
          label="Email address"
          value={email}
          className="mb-3"
          onChange={(e)=>setEmail(e.target.value)}
        >
          <Form.Control type="email" placeholder="name@example.com" />
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

        
        <br />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
}