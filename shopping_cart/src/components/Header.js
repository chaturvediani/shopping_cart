import React from 'react'
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
export default function Header() {
  const userInfo=localStorage.getItem("userInfo");
  const cartInfo=localStorage.getItem("Cart")
  // const {name}=userInfo
  const user=JSON.parse(userInfo)
  const navigate=useNavigate()
  const logoutHandler = () => {
    JSON.stringify(userInfo)
    localStorage.removeItem("userInfo")
    localStorage.removeItem("Cart")
    navigate('/')
  };
  return (
    <div>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">ShoppingCart</Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='ms-auto'>
        {userInfo ? (
            <>
              <Nav.Link href="/">home</Nav.Link>
              <NavDropdown
                title="Choose Action"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/cart">
                  View Cart
                </NavDropdown.Item>
                <NavDropdown.Item href="/products">View products</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
        ) : (
          <Nav.Link href="/login">Login</Nav.Link>
        )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>


      {/* <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">ShoppingCart</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Add</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Update</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">delete</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">LogOut</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar> */}
    </div>
  )
}
