import './App.css';
import Navegacion from './Componentes/Navegacion';
import Login from './Componentes/Login';
import { Container, Row, Col } from 'react-bootstrap';
import Registro from './Componentes/Registro';
import { Routes, Route, Link } from "react-router-dom";
import Productos from './Componentes/Productos';
import Centros from './Componentes/Centros';

function App() {
  return (
      <>
        <Navegacion/>
        {/* <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="login" element={<Login />} />
        </Routes> */}
        <Container fluid>
          <Row className='mt-4'>
            <Col md={8}>
            <Productos/>
              {/* <Registro/> */}
              </Col>
            <Col md={4}>
             <Centros/>
            </Col>
          </Row>
        </Container>
  
      </>    
  );
}

export default App;
