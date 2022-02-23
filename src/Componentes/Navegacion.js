import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Badge, Form } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import UserContext from '../context/users/UserContext';
import { delete_cookie, read_cookie, bake_cookie } from 'sfcookies';
import './customModal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Navegacion = () => {

    const { user, puntos, updatePuntos, updateUser } = useContext(UserContext);
    const [ modal, setModal ] = useState(false);
    const [ codigo, setCodigo] = useState('');

    const canjeExitoso = (message) => toast.success(`¡${message}!`,{
        theme: "dark"
    });


    const codigoInvalido = (message) => toast.error(`¡${message}`,{
        theme: "dark"
    });


    const abrirModal = () => {
        setModal(true);
    }

    const cerrarModal = () => {
        setModal(false);
    }

    const cerrarSesion = () => {

        delete_cookie('jwt');
        delete_cookie('usuario');
        delete_cookie('puntos');

        updatePuntos(null);
        updateUser('');
    }

    useEffect(()=>{

    },[user]);

    const canjearPuntos = async () =>{

        const response = await fetch('https://siscanj.herokuapp.com/public/api/canje',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${read_cookie('jwt')}`
            },
            body: JSON.stringify({
                codigo
            })
        });

        const content = await response.json();

        if(content.puntos > 0){

            cerrarModal();
            canjeExitoso(content.message);
            let puntosNuevos = content.puntos
            bake_cookie('puntos', puntosNuevos);
            updatePuntos(puntosNuevos);

        }else{
            cerrarModal();
            codigoInvalido('Codigo invalido!');
        }
    }

  return (
    <Navbar bg="dark" expand="lg">
        <div>
            <ToastContainer position='bottom-right' hideProgressBar={true} />
        </div>

        <Modal open={modal} onClose={cerrarModal} center classNames={{modal:'customModal'}}>
            <h2 className='text-center'>Canjear puntos</h2>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Codigo de producto:</Form.Label>
                <Form.Control onChange={e => setCodigo(e.target.value)}  type="text" placeholder="Ingrese el codigo"/>
            </Form.Group>
            </Form>
            <div className="d-grid gap-2 mt-2">
                <Button variant='success' onClick={canjearPuntos}>Canjear</Button>
            </div>
            
        </Modal>

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
                        <NavDropdown.Item href="#action3">
                            <NavLink style={{color:'black', textDecoration:'none'}} to='/canjes'>
                                Productos canjeados
                            </NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={abrirModal}>
                                Canjear puntos
                        </NavDropdown.Item>
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