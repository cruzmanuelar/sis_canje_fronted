import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Dropdown} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import UserContext from '../context/users/UserContext';
import { ToastContainer } from 'react-toastify';
import { read_cookie, bake_cookie } from 'sfcookies';
import 'react-toastify/dist/ReactToastify.css';
import { puntosInsuficientes, alertaNoLogeado } from './alertas/alertasToastify';
import { ActualizarPuntos } from '../transacciones/Puntos';
import { canjeProducto, centroId } from '../Rutas';

const Centro = () => {

  const { user, updateUser, updatePuntos } = useContext(UserContext);

  let [centro, setCentro] = useState([]);
  let [producto, setProductos] = useState([]);

  const {id} = useParams();
  const navigate = useNavigate();

  let url = `${centroId}-${id}`;

  useEffect(() => {

    const obtenerCentros = async () => {

      const data = await fetch(url)
      const centros = await data.json()
      setCentro(centros.centro);
      setProductos(centros.productos);
    };

    const usuario = read_cookie('usuario');
    const puntos = read_cookie('puntos');

    updateUser(usuario);
    updatePuntos(puntos);
    
    obtenerCentros();

  }, [url]);

  const irCentros = () => {
    navigate('/centros');
  }

  const canjearProducto = async (id, puntosProducto) =>{

    const response = await fetch(canjeProducto,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${read_cookie('jwt')}`
        },
        body: JSON.stringify({
            id_producto:id,
        })
    });

    const content = await response.json();

    if(content.message == 'No cuentas con suficientes puntos'){
        puntosInsuficientes();
    }else{
        
        // const puntosAntes = read_cookie('puntos');
        // const puntosAhora = puntosAntes - puntosProducto;
        // bake_cookie('puntos', puntosAhora);
        // updatePuntos(puntosAhora);
        ActualizarPuntos();

    }
  }

  const validarPuntos = (id, puntosProducto) => {

    user == '' ? alertaNoLogeado() : canjearProducto(id, puntosProducto);
  }


  return (
    <Container fluid className='mt-3'>
      <div>
        <ToastContainer position='bottom-right' hideProgressBar={true} />
      </div>
      {centro.length === 0 ?
        <Row
        style={{
          position: 'absolute', left: '45%', top: '50%'
        }}
        >
          <ReactLoading type={'bubbles'} color="black" height={'20%'} width={'20%'}></ReactLoading>
        </Row>
        :
        <Row>
          <Col md={3} className='text-center mx-auto'>
            <div className='text-center mt-2'>
              <h3>Centro</h3>                    
            </div>
            <Card className='mt-4'>
              <Card.Body>
                <Card.Title>{centro.nombre}</Card.Title>
                <Card.Text>
                  Direccion: {centro.direccion}
                </Card.Text>
                <Card.Img variant="top" src={centro.imagen}/>
                <Button className='mt-2' onClick={irCentros} variant="success">Volver</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          </Col>
          <Col md={8}>
          <div className='text-center'>
            <h3>Productos de este centro</h3>                    
          </div>
          <Dropdown.Divider />
            <Row className=''>
              {producto.map((pr) => 
                <Col md={3} key={pr.id}>
                  <Card className='mt-4'>
                  <Card.Img variant="top" src={pr.imagen}/>
                  <Card.Body>
                    <Card.Title>{pr.nombre}</Card.Title>
                    <Card.Text>
                    <h5>
                      <Badge bg="danger">{pr.precio_puntos} ptos</Badge>{' '}
                      <Badge bg="warning">{pr.cantidad} disp</Badge>
                    </h5>
                    </Card.Text>
                    <Button onClick={() => validarPuntos(pr.id, pr.precio_puntos)} variant="primary">Canjear</Button>
                  </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      }
      
    </Container>
  )
}

export default Centro