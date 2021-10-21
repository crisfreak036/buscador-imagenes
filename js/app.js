import * as UI from './interfaz.js';

UI.formulario.addEventListener('submit', validadFormulario);

function validadFormulario(e){
    e.preventDefault();

    const termino = UI.inputTermino.value;
    if(termino === ''){
        UI.mostrarAlerta('Debe agregar un termino antes de realizar la busqueda', 'error', 2500);
        return;
    }

    // Consultar la API
}