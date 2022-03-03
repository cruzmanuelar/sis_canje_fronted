import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Image } from 'react-bootstrap';
import login from '../estilos/login.css';

const Loginof = () => {

  return (
        <div className='fondo' md={4} sm={12}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
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

                onSubmit={(valores, { resetForm })=>{
                    resetForm();
                    console.log(valores);
                    console.log('enviar');
                }}
                >
                {()=>(
                    <Form className='bg-light text-dark formulario'>
                        <div className='text-center my-2'>
                            <h3 className='my-3'>Iniciar sesion - CoKanje</h3>
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
                            <label className='label' htmlFor='correo'>Correo electronico:</label>
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
                            <label className='label' htmlFor='password'>Contrasena:</label>
                            <Field 
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Password'
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

export default Loginof;