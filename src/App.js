import Navegacion from './Componentes/Navegacion';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Productos from './Componentes/Productos';
import Centros from './Componentes/Centros';
import Nosotros from './Componentes/Nosotros';
import Centro from './Componentes/Centro';
import NotFound from './Componentes/NotFound';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import { useEffect, useState } from 'react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import UserContext from './context/UserContext';

function App() {

  const [value, setValue] = useState('from context')

  useEffect(() => {
    
    // console.log(read_cookie('puntos'));

  },[]);

  const userData = {
    nombres:"INAGURACION",
    puntos: 0
  }

  return (

    <UserContext.Provider value={{value, setValue}}>
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
    </UserContext.Provider>

    
  );
}

export default App;
