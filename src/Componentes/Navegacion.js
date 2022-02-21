import React, { useContext, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Badge} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import UserContext from '../context/users/UserContext';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const Navegacion = () => {

    const { user, puntos, updatePuntos, updateUser } = useContext(UserContext);

    const cerrarSesion = () => {
        delete_cookie('jwt');
        delete_cookie('usuario');
        delete_cookie('puntos');

        updatePuntos(null);
        updateUser('');
    }

    useEffect(()=>{

    },[user])
    

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
                        <NavLink style={{color:'white', textDecoration:'none'}} to='/nosotros'>Nosotros {user}</NavLink>
                    </Nav.Link>

                </Nav>

                {user == ''?
                <>
                    <Button variant="primary outline-danger">
                        <NavLink style={{color:'white', textDecoration:'none'}} to='/registro'>Registrarse</NavLink>
                    </Button>
                    <Button variant="success outline-danger">
                        <NavLink style={{color:'white', textDecoration:'none'}} to='/login'>Ingresar</NavLink>
                    </Button>

                    
                </>
                :
                <>
                    <NavDropdown style={{ color: 'white' }} title="Perfil" >
                        <NavDropdown.Item href="#action3">
                            Puntos disponibles{' '}<Badge bg="success">{puntos}</Badge>
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action3">Mis productos canjeados</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Canjear puntos</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Mi perfil
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Button onClick={cerrarSesion} variant="danger outline-danger">
                        <NavLink style={{color:'white', textDecoration:'none'}} to='/'>Cerrar sesion</NavLink>
                    </Button>
                </>
                }
                
                

            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navegacion