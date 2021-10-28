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

export async function buscaImagenes(){
    const termino = UI.inputTermino.value;
    const key = '23957148-599aa7fca85d3a65cfb381d7c';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${resultadosPorPagina}&page=${UI.paginaActual}`;

    // Consulta con try-catch-async-await
    try {
        const respuesta = await fetch(url);
        const resultados = await respuesta.json();
        const destructuring = function(resultados){
            const { hits, totalHits } = resultados;
            totalPaginas = calcularPaginas( totalHits, resultadosPorPagina );
            UI.mostrarImagenes(hits, totalPaginas);
        }
        destructuring(resultados);
    } catch (error) {
        console.log(error);
    }
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