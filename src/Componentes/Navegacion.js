import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, Badge} from 'react-bootstrap';
import { NavLink } from "react-router-dom";

const Navegacion = (props) => {
  return (
    <Navbar bg="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand className='text-light h2'>
                <NavLink style={{color:'white', textDecoration:'none'}} to='/'>CoKanje</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px'}}
                    navbarScroll
                >
                    <Nav.Link className='text-light h5'>
                        <NavLink style={{color:'white', textDecoration:'none'}} to='/'>Productos</NavLink>
                    </Nav.Link>

                    <Nav.Link className='text-light h5'>
                        <NavLink style={{color:'white', textDecoration:'none'}} to='/centros'>Centros</NavLink>
                    </Nav.Link>
                    
                    <Nav.Link className='text-light h5'>
                        <NavLink style={{color:'white', textDecoration:'none'}} to='/nosotros'>Nosotros</NavLink>
                    </Nav.Link>

                </Nav>
                
                <NavDropdown style={{ color: 'white' }} title="Perfil" >
                    <NavDropdown.Item href="#action3">
                        Puntos disponibles{' '}<Badge bg="success"> 40</Badge>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action3">Mis productos canjeados</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Canjear puntos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Mi perfil {props.nombre}
                    </NavDropdown.Item>
                </NavDropdown>
                <Button variant="danger outline-danger">
                    <NavLink style={{color:'white', textDecoration:'none'}} to='/'>Cerrar sesion</NavLink>
                </Button>
                <Button variant="primary outline-danger">
                    <NavLink style={{color:'white', textDecoration:'none'}} to='/registro'>Registrarse</NavLink>
                </Button>
                <Button variant="success outline-danger">
                    <NavLink style={{color:'white', textDecoration:'none'}} to='/login'>Ingresar</NavLink>
                </Button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navegacion