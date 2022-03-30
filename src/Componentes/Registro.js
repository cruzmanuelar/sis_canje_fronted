import { Button, Image, Spinner } from 'react-bootstrap';
import React, { useContext, useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserContext from '../context/users/UserContext';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Rutas';
import '../estilos/estilos.css';
import { errorRegistro, usuarioRegistrado } from './alertas/alertasToastify';


const Registro = () => {

  const [ spinner, setSpineer ] = useState(false);

  let navigate = useNavigate();
  const { auth } = useContext(UserContext);

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
      }}>

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
          }else if(valores.usuario.length < 4){
            errores.usuario = 'Minimo 4 caracteres';
          }

          if(!valores.dni ){
            errores.dni = 'Ingresa un DNI';
          }else if(!/^[0-9]{8}$/.test(valores.dni)){
            errores.dni = 'DNI incorrecto';
          }

          if(!valores.correo){
            errores.correo = 'Ingresa un correo';
          }else if(!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(valores.correo)){
            errores.correo = 'Correo invalido';
          }

          if(!valores.password){
            errores.password = 'Ingresa la contrasena';
          }

          return errores;
        }}

        onSubmit={ async (valores, { setFieldValue })=>{

          setSpineer(true);

          const response = await fetch(`${baseUrl}/registro`,{
              method: 'POST',
              credentials: 'include',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                nombre:valores.usuario,
                dni: valores.dni,
                correo:valores.correo,
                password: valores.password
              })
          });

          const content = await response.json();

          setSpineer(false);

          if(content.Estado === 'Fallo'){

            const { Errores } = content;
            const { dni, nombre, correo } = Errores;

            nombre !== undefined && errorRegistro(nombre[0]);
            dni !== undefined && errorRegistro(dni[0]);
            correo !== undefined && errorRegistro(correo[0]);

          }else{

            usuarioRegistrado('Usuario registrado con exito');
          } 

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
                <ErrorMessage name="dni" />
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
              {spinner ?
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              :
              'Registrarme'
              }
            </Button>
          </div>

        </Form>    
      )}  
      </Formik>
    </div>
  )
}

export default Registro;