import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/users/UserContext';
import { baseUrl } from "../Rutas";
import '../estilos/estilos.css';
import { ToastContainer } from 'react-toastify';
import { credencialInvalida } from './alertas/alertasToastify';

const Login = () => {

    let navigate = useNavigate();
    const { auth,updatePuntos, updateAuth } = useContext(UserContext);

    useEffect(()=>(

        auth && navigate('/')

    ))



  return (
        <div className='fondo' md={4} sm={12}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >   
            <div>
                <ToastContainer position='bottom-right' hideProgressBar={true} />
            </div>
            <Formik
                initialValues={{
                    correo:'',
                    password:''
                }}
                    
                validate={(valores)=>{
                
                    let errores = {};

                    if(!valores.correo){
                        errores.correo = 'Ingresa un correo';
                    }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
                        errores.correo = 'Correo invalido';
                    }
                    
                    if(!valores.password){
                        errores.password = 'Ingresa una contrasena';
                    }

                    return errores;

                }}

                onSubmit={ async (valores, { setFieldValue })=>{

                    const response = await fetch(`${baseUrl}/login`,{
                        method: 'POST',
                        credentials: 'include',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({
                          correo:valores.correo,
                          password: valores.password
                        })
                    });

                    const content = await response.json();

                    if(content.message === 'Bienvenido'){

                        let token = content.token;
                        let puntos = content.puntos;
                  
                        localStorage.setItem('token', token);
                        localStorage.setItem('puntos', puntos);
                        updateAuth(true);
                        updatePuntos(puntos);
                  
                        navigate('/');
                  
                      }else{
                        credencialInvalida();
                        setFieldValue('password','');
                        console.log('Unauthorized');
                    }

                }}

                >

                {()=>(
                    <Form className='bg-light text-dark formulario'>
                        <div className='text-center my-2'>
                            <h3 className='my-3'>Iniciar sesión - CoKanje</h3>
                            <Image fluid src='/images/botellasplasticas.jpg'
                            style={{
                                width:'25vh',
                                height:'25vh',
                                border:'2px solid black',
                                borderRadius:'4px'
                            }}>
                            </Image>
                        </div>

                        <div className='labelInput'>
                            <label className='label' htmlFor='correo'>Correo electrónico:</label>
                            <Field 
                                type='text'
                                id='correo'
                                name='correo'
                                placeholder='Correo'
                                className='input'
                            />
                        </div>
                        <div style={{color:'red'}}>
                            <ErrorMessage name="correo" />
                        </div>
                    

                        <div className='labelInput'>
                            <label className='label' htmlFor='password'>Contraseña:</label>
                            <Field 
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Contraseña'
                                className='input'
                            />
                        </div>
                        <div style={{color:'red'}}>
                            <ErrorMessage name="password" />
                        </div>
                        <div className="d-grid gap-2 mt-2">
                            <Button variant="success" type="submit">
                                Iniciar sesion
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>    

  );
}

export default Login;