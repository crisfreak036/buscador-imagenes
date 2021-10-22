import * as UI from './interfaz.js';
import * as func from './funciones.js';

window.onload = () => {
    
    // Al cargar la página, el submit queda disponible
    UI.formulario.addEventListener('submit', func.validadFormulario);
};