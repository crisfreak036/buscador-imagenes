import * as UI from './interfaz.js';

const resultadosPorPagina = 40;
let totalPaginas;

export function validadFormulario(e){
    e.preventDefault();

    const termino = UI.inputTermino.value;
    if(termino === ''){
        UI.mostrarAlerta('Debe agregar un termino antes de realizar la busqueda', 'error', 2500);
        return;
    }

    // Consultar la API
    buscaImagenes();
}

export function buscaImagenes(){
    const termino = UI.inputTermino.value;
    const key = '23957148-599aa7fca85d3a65cfb381d7c';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${resultadosPorPagina}&page=${UI.paginaActual}`;
    fetch(url)
    .then( respuesta => respuesta.json() )
    .then( resultados => {
        const { hits, totalHits } = resultados;
        totalPaginas = calcularPaginas( totalHits, resultadosPorPagina );
        UI.mostrarImagenes(hits, totalPaginas);
    } )
}

// Generador que va a registrar la cantidad de elementos de acuerdo a las páginas
export function *crearPaginador(totalPaginas){
    for(let i = 1; i <= totalPaginas; i++){
        yield i;
    }
}

export function calcularPaginas( total, registrosPorPagina ){
    return parseInt( Math.ceil( total / registrosPorPagina ))
}