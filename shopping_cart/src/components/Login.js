import React from "react";
import { Container, Form, FloatingLabel, Button, Card } from "react-bootstrap";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
   
export default function Login() {
  const navigate=useNavigate();
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState(false)
const [loading,setLoading]=useState(false)
const userInfo=localStorage.getItem("userInfo")
const user=JSON.parse(userInfo)
useEffect(() => {
  if (userInfo) {
    console.log("logged in");
    navigate("/products")
  }
}, [navigate,userInfo]);
  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      const config={
        headers:{
          "Content-type":"application/json"
        }
      }
      setLoading(true)
    const {data}=await axios.post("http://localhost:8000/login",
    {
      email,
      password,
    },config);

    console.log(data)
    localStorage.setItem("userInfo", JSON.stringify(data))
    setLoading(false)
    } catch (error) {
      setError(error.response.data.message)
      console.log(error)
      setLoading(false)
    }
    
    console.log("submitted");
  };

  return (
    <Container className="mt-5">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Form onSubmit={onSubmitHandler}>
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          value={email}
          className="mb-3"
          onChange={(e)=>setEmail(e.target.value)}
        >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          value={password}
          className="mb-3"
          onChange={(e)=>setPassword(e.target.value)}
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>

       

        <br />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
}