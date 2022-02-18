import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button} from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";

const Navegacion = () => {
  return (
    <Navbar bg="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand className='text-light h1' href="#">Canjea2</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px'}}
                navbarScroll
            >
                <Nav.Link className='text-light h5' href="/centros">
                    <Link style={{ textDecoration: 'none', color:'white'}} to="/">Centros</Link>
                </Nav.Link>
                
                <Nav.Link className='text-light h5' href="/nosotros">
                    <Link to="/" style={{ textDecoration: 'none', color:'white'}}>Nosotros</Link>
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