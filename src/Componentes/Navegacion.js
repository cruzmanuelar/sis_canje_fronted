import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Badge, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from '../context/users/UserContext';
import { ToastContainer } from 'react-toastify';
import { canjeExitoso, codigoInvalido } from './alertas/alertasToastify';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { canjePuntos } from '../Rutas';

const Navegacion = (props) => {

    const { auth, puntos, updatePuntos, updateAuth } = useContext(UserContext);
    const [ modal, setModal ] = useState(false);
    const [ codigo, setCodigo] = useState('');

    let navigate = useNavigate();

    const abrirModal = () => setModal(true);
    const cerrarModal = () => setModal(false);

    const cerrarSesion = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('puntos');
        updateAuth(false);
    }

    useEffect(()=>{

        const token = localStorage.getItem('token');
        token != null ? updateAuth(true) : updateAuth(false);
        const puntos = localStorage.getItem('puntos');
        puntos != null && updatePuntos(puntos);

    },[]);

    const canjearPuntos = async () =>{

        const response = await fetch(canjePuntos,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                codigo
            })
        });

        const content = await response.json();

        if(content.message != 'Código inválido'){

            cerrarModal();
            canjeExitoso(content.message);
            const puntosNuevos = content.puntos;
            localStorage.setItem('puntos', puntosNuevos);

        }else{

            cerrarModal();
            codigoInvalido(content.message);
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
                <Form.Control onChange={e => setCodigo(e.target.value)}  type="text" placeholder="XXXX-XXXX"/>
            </Form.Group>
            </Form>
            <div className="d-grid gap-2 mt-2">
                <Button variant='success' onClick={canjearPuntos}>Canjear</Button>
            </div>
            
        </Modal>

        <Container fluid>
            <Navbar.Brand className='text-light h2'>
                CoKanje
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" className='border-secondary'/>
            <Navbar.Collapse id="navbarScroll">
            
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px'}}
                    navbarScroll
                >
                    <NavLink className='d-flex align-items-center h5 mx-2 text-white' style={{textDecoration:'none'}} to='/'>Productos</NavLink>

                    <NavLink className='d-flex align-items-center h5 mx-2 text-white' style={{textDecoration:'none'}} to='/centros'>Centros</NavLink>

                    <NavLink className='d-flex align-items-center h5 mx-2 text-white' style={{textDecoration:'none'}} to='/nosotros'>Nosotros</NavLink>

                </Nav>

                {auth?
                <>
                <NavDropdown style={{ textDecoration:'none' }} title="Perfil" className='text-white'>
                    <NavDropdown.Item>
                    Puntos disponibles{' '}<Badge bg="success">{puntos}</Badge>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('/canjes')}>
                        Productos canjeados
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={abrirModal}>
                        Canjear puntos
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                        Mi perfil
                    </NavDropdown.Item>
                </NavDropdown>
                
                <Button onClick={cerrarSesion} variant="danger outline-danger">
                    <NavLink style={{color:'white', textDecoration:'none'}} to='/'>Cerrar sesion</NavLink>
                </Button>
                </>
                :
                <>
                <Button variant="primary outline-danger">
                    <NavLink style={{color:'white', textDecoration:'none'}} to='/registro'>Registrarse</NavLink>
                </Button>
                <Button className='mx-2' variant="success outline-danger">
                    <NavLink style={{color:'white', textDecoration:'none'}} to='/login'>Ingresar</NavLink>
                </Button>
                </>
                }
                
                
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navegacion