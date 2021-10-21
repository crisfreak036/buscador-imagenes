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
    buscaImagenes(termino);
}

function buscaImagenes(termino){

    const key = '23957148-599aa7fca85d3a65cfb381d7c';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;
    console.log(url);
    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( resultados => {
            const { hits } = resultados;
            UI.mostrarImagenes(hits);
        } )
}