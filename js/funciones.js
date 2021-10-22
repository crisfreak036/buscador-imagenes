
// Generador que va a registrar la cantidad de elementos de acuerdo a las páginas
export function *crearPaginador(totalPaginas){
    for(let i = 1; i <= totalPaginas; i++){
        yield i;
    }
}

export function calcularPaginas( total, registrosPorPagina ){
    return parseInt( Math.ceil( total / registrosPorPagina ))
}