import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button} from 'react-bootstrap';
import { Routes, Route, NavLink } from "react-router-dom";

const Navegacion = () => {
  return (
    <Navbar bg="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand className='text-light h1' href="">
                <NavLink style={{color:'white', textDecoration:'none'}} to='/'>Productos</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px'}}
                navbarScroll
            >
                <Nav.Link className='text-light h5' href="">
                    <NavLink style={{color:'white', textDecoration:'none'}} to='/centros'>Centros</NavLink>
                </Nav.Link>
                
                <Nav.Link className='text-light h5' href="/">
                    <NavLink style={{color:'white', textDecoration:'none'}} to='/nosotros'>Nosotros</NavLink>
                </Nav.Link>

            </Nav>
            
            <Form className="d-flex" >
                <NavDropdown style={{ color: 'white' }} title="Perfil" >
                    <NavDropdown.Item href="#action3">Mis productos canejados</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Canjear puntos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Mi perfil
                    </NavDropdown.Item>
                </NavDropdown>
                <Button variant="danger outline-danger">Cerrar sesion</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navegacion