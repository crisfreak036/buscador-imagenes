import * as func from './funciones.js';
export let iterador, paginaActual = 1;

// Selectores
export  const formulario = document.querySelector('#formulario'),
            inputTermino = document.querySelector('#termino'),
            contenedorResultado = document.querySelector('#resultado'),
            paginacion = document.querySelector('#paginacion');


// Funciones

export function mostrarAlerta(mensaje, tipo, tiempo){
    if(!document.querySelector('.alerta-personalizada')){

        // Crea un contenedor
        const alerta = document.createElement('p');
        
        // Dependiendo el tipo, se agregan ciertas clases
        if( tipo === 'error'){
            alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded','max-w-lg', 'mx-auto','mt-6', 'text-center', 'alerta-personalizada');
            // Agrega contenido al contenedor
            alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
            `
        }else{
            alerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded','max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta-personalizada');
            alerta.innerHTML = `
            <span class="block sm:inline">${mensaje}</span>
            `
        }
        
        // Agrega la alerta al HTML
        formulario.appendChild(alerta);
        
        // Elimina la alerta después de 2 segundos
        setTimeout(() => {
            alerta.remove();
        }, tiempo);
    }
}

export function limpiarResultadosPrevios( elemento ){

    while(elemento.firstChild){
        elemento.removeChild(elemento.firstChild)
    }
}

export function mostrarImagenes( imagenes, totalPaginas ){
    // Limpia los resultados anteriores
    limpiarResultadosPrevios( contenedorResultado );

    // Itera sobre el arreglo con las imagenes y su información
    imagenes.forEach( imagen => {
        const { previewURL, largeImageURL, views, likes} = imagen;

        // Concatena cada imagen iterada al HTML
        contenedorResultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4 contenedor-imagenes">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">
                    
                    <div class="p-4">
                        <p class="font-bold"> ${likes} <span class="font-light"> Me Gusta ❤ </span> </p>
                        <p class="font-bold"> ${views} <span class="font-light"> Veces vista 👁‍🗨 </span> </p>
                        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5"
                        href="${largeImageURL}" target="_blank" rel="noopener noreferrer"
                        > Ver Imagen 📷
                        </a>
                    </div>
                </div>
            </div>
        `
    });
    mostrarPaginador(totalPaginas);
}

function mostrarPaginador(totalPaginas) {
    
    // Limpiar la paginacion anterior
    limpiarResultadosPrevios(paginacion);

    iterador = func.crearPaginador(totalPaginas);

    while(true){
        // Destructuring del iterador.next()
        const { value, done } = iterador.next();
        if(done) return;


        // Genera un botón por cada elemento en el generador
        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');

        // Al hacer click vuelve a pedir a la API que entrega la nueva pagina con imagenes
        boton.onclick = function(){
            paginaActual = value;
            func.buscaImagenes();
        }
        
        // Añade el boton al DOM
        paginacion.appendChild(boton);
    }
}