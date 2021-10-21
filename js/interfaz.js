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