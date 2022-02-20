import Navegacion from './Componentes/Navegacion';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Productos from './Componentes/Productos';
import Centros from './Componentes/Centros';
import Nosotros from './Componentes/Nosotros';
import Centro from './Componentes/Centro';
import NotFound from './Componentes/NotFound';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';

function App() {
  return (

    <BrowserRouter>
      <Navegacion/>

      <Routes>
        <Route path='/' element={<Productos/>}/>
        <Route path='/nosotros' element={<Nosotros/>}/>
        <Route path='/Centros' element={<Centros/>}/>
        <Route path='/centro/:id' element={<Centro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registro' element={<Registro/>}/>
        <Route path='*' element={<NotFound/>}/>

      </Routes>      
    </BrowserRouter>
  );
}

export default App;
