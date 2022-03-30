import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const puntosInsuficientes = () => toast.warning("No cuentas con suficientes puntos!",{
    toastId:"puntos-insuficientes",
    theme: "dark"
});

const alertaNoLogeado = () => toast.error("Debes iniciar sesion!",{
    toastId:"no-logueado",
    theme: "dark",
});

const codigoInvalido = (message) => toast.error(`¡${message}!`,{
    toastId:"codigo-invalido",
    theme: "dark",
});

const canjeExitoso = (message) => toast.success(`¡${message}!`,{
    toastId:"canje-exitoso",
    theme: "dark"
});

const usuarioRegistrado = (message) => toast.success(`¡${message}!`,{
    toastId:"usuario-registrado",
    theme: "dark"
});

const credencialInvalida = () => toast.warning("Credenciales invalidas",{
    toastId:"credencial-invalida",
    theme: "dark"
});

const errorRegistro = (message) => toast.warning(`¡${message}!`,{
    toastId:"error-registro",
    theme: "dark"
});

export {puntosInsuficientes, alertaNoLogeado, canjeExitoso, codigoInvalido, credencialInvalida, errorRegistro,usuarioRegistrado };