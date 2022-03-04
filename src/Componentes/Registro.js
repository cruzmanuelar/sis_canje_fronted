import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { registro } from '../Rutas';
import estilos from '../estilos/estilos.css';
import { ToastContainer } from 'react-toastify';


const Registro = () => {

  const [redirect, setRedirect] = useState(false);

  let navigate = useNavigate();

  const enviar = async (e) => {

    e.preventDefault();

    const response = await fetch(registro,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({

      })
    });

    setRedirect(true);
  }

  if(redirect){
    
    navigate('/login');

  }

  return (
    <div className='fondo' md={4} sm={12}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <div>
        <ToastContainer position='bottom-right' hideProgressBar={true} />
      </div>
      <Formik
        initialValues={{
          usuario:'',
          dni:'',
          correo:'',
          password:''
        }}

        validate={(valores) => {
          
          let errores = {};
          
          if(!valores.usuario){
            errores.usuario = 'Ingresa un usuario';
          }

          if(!valores.dni){
            errores.dni = 'Ingresa un DNI';
          }

          if(!valores.correo){
            errores.correo = 'Ingresa un correo';
          }

          if(!valores.password){
            errores.password = 'Ingresa la contrasena';
          }

          return errores;
        }}
      >
      {() =>(
        <Form className='bg-light text-dark formulario'
          style={{
            width:'30%',
            minWidth:'400px',

          }}  
        >
          <div className='text-center my-2'>
            <h3 className='my-3'>Registrarse - CoKanje</h3>
            <Image fluid src='/images/botellasplasticas.jpg'
              style={{
                width:'25vh',
                height:'25vh',
                border:'2px solid black',
                borderRadius:'4px'
              }}>
            </Image>
          </div>

          <div style={{display:'flex'}} className='contenedorRegistro'>
            <div className='labelInput inputRegistro'>
              <div style={{display:'flex', flexDirection:'column'}}>
                <label className='label' htmlFor='correo'>Usuario:</label>
                <Field 
                  type='text'
                  id='usuario'
                  name='usuario'
                  placeholder='Usuario'
                  className='input'
                />
              </div>
              <div style={{color:'red'}}>
                <ErrorMessage name="usuario" />
              </div>
            </div>
              

            <div className='labelInput inputRegistro'>
              <div style={{display:'flex', flexDirection:'column'}}>
                <label className='label' htmlFor='correo'>DNI:</label>
                <Field 
                  type='text'
                  id='dni'
                  name='dni'
                  placeholder='DNI'
                  className='input'
                />
              </div>
              <div style={{color:'red'}}>
                <ErrorMessage name="usuario" />
              </div>
            </div>
            
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
              Registrarme
            </Button>
          </div>

        </Form>    
      )}  
      </Formik>
    </div>
  )
}

export default Registro