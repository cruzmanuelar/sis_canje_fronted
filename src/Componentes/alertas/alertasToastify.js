import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const puntosInsuficientes = () => toast.warning("No cuentas con suficientes puntos!",{
    theme: "dark"
});

const alertaNoLogeado = () => toast.error("Debes iniciar sesion!",{
    theme: "dark",
});

const codigoInvalido = (message) => toast.error(`¡${message}!`,{
    theme: "dark",
});

const canjeExitoso = (message) => toast.success(`¡${message}!`,{
    theme: "dark"
});

const credencialInvalida = () => toast.warning("Credenciales invalidas",{
    theme: "dark"
});

export {puntosInsuficientes, alertaNoLogeado, canjeExitoso, codigoInvalido, credencialInvalida };