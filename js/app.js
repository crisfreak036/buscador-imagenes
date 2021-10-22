import * as UI from './interfaz.js';
import * as func from './funciones.js';

const resultadosPorPagina = 40;
let totalPaginas;

window.onload = () => {
    
    // Al cargar la página, el submit queda disponible
    UI.formulario.addEventListener('submit', validadFormulario);
};

function buscaImagenes(termino){
    
    const key = '23957148-599aa7fca85d3a65cfb381d7c';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${resultadosPorPagina}`;
    fetch(url)
    .then( respuesta => respuesta.json() )
    .then( resultados => {
        const { hits, totalHits } = resultados;
        totalPaginas = func.calcularPaginas( totalHits, resultadosPorPagina );
        // console.log(totalPaginas);
        UI.mostrarImagenes(hits, totalPaginas);
    } )
}

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