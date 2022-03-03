import Navegacion from './Componentes/Navegacion';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Productos from './Componentes/Productos';
import Centros from './Componentes/Centros';
import Nosotros from './Componentes/Nosotros';
import Centro from './Componentes/Centro';
import NotFound from './Componentes/NotFound';
import Login from './Componentes/Login';
import Loginof from './Componentes/Loginof';
import Registro from './Componentes/Registro';
import UserState from './context/users/UserState';
import ProductosCanjeados from './Componentes/ProductosCanjeados';

import { useEffect } from 'react';

function App() {

  useEffect(()=>{

  },[])

  return (
    <UserState>
      <BrowserRouter>
          <Navegacion/>
          <Routes>
            <Route path='/' element={<Productos/>}/>
            <Route path='/nosotros' element={<Nosotros/>}/>
            <Route path='/Centros' element={<Centros/>}/>
            <Route path='/centro/:id' element={<Centro/>}/>
            <Route path='/login' element={<Loginof/>}/>
            <Route path='/canjes' element={<ProductosCanjeados/>}/>
            <Route path='/registro' element={<Registro/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>      
      </BrowserRouter>
    </UserState>
  );
}

export default App;
