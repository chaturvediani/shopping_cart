import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import gsk_img from "../cartimg.jpg"
import gskimg2 from "../cart2img.png"
export default function Home() {
 
  return (
    <Container align="center">
       <div>
          <img
            src={gsk_img}
            alt="gsk"
            style={{
              width: 600,
              height:400,
              backgroundColor: "red",
              verticalAlign: "right"
            }}
          />
          <img
            src={gskimg2}
            alt="Info"
            style={{
              width: 600,
              height:400,
              backgroundColor: "red",
              verticalAlign: "left"
            }}
          />
          </div>
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Shopping Cart</Card.Title>
        <Card.Text style={{ fontSize: "20px" }}>
         Login to view the products.
        </Card.Text>

        <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
            </div>

    <Container className="mt-5">
      <Link to="/home">home</Link>
      
    </Container>
    </Card.Body>
      </Card>
    </Container>
  );
}
