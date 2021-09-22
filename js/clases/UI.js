import {cargarEdicion,eliminarCita} from '../funciones.js';
import {contenedorCitas} from '../selectores.js'
class UI{
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert','d-block','col-12','text-center');
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }
        divMensaje.textContent = mensaje;
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));
        setTimeout(()=>{
            divMensaje.remove();
        },3000)
    }
    imprimirCita({citas}) {// se puede extraer desde el parametro con un destructuring
        this.limpiarHTML();
        citas.forEach(cita => {
           const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
           const divCita = document.createElement('div');
           divCita.classList.add('p-3','cita');
           divCita.dataset.id = id;
    // Scripting de los elementos
           const parrafoMascota = document.createElement('h2');
           parrafoMascota.classList.add('card-tittle','font-weight-bolder');
           parrafoMascota.innerHTML = `${mascota}`;
           
           const parrafoPropietario = document.createElement('p');
           parrafoPropietario.innerHTML = `
           <span class ="font-weight-bolder"> Propietario:</span>${propietario}
           `
           const parrafoTelefono = document.createElement('p');
           parrafoTelefono.innerHTML = `
           <span class ="font-weight-bolder"> Teléfono:</span>${telefono}
           `
           const parrafoFecha = document.createElement('p');
           parrafoFecha.innerHTML = `
           <span class ="font-weight-bolder"> Fecha:</span>${fecha}
           `
           const parrafoHora = document.createElement('p');
           parrafoHora.innerHTML = `
           <span class ="font-weight-bolder"> Hora:</span>${hora}
           `
           const parrafoSintomas = document.createElement('p');
           parrafoSintomas.innerHTML = `
           <span class ="font-weight-bolder"> Sintomas:</span>${sintomas}
           `
           const btnEliminar = document.createElement('button');
           btnEliminar.classList.add('btn','btn-danger','mr-2');
           // Iconos de heroicons.com muy buena página
           btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>`
           btnEliminar.onclick = ()=> eliminarCita(id);
           
           const btnEditar = document.createElement('button');
           btnEditar.classList.add('btn','btn-info');
           btnEditar.innerHTML =`Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
           </svg> `
           btnEditar.onclick = ()=> cargarEdicion(cita);

           divCita.appendChild(parrafoMascota);
           divCita.appendChild(parrafoPropietario);
           divCita.appendChild(parrafoTelefono);
           divCita.appendChild(parrafoFecha);
           divCita.appendChild(parrafoHora);
           divCita.appendChild(parrafoSintomas);
           divCita.appendChild(btnEliminar);
           divCita.appendChild(btnEditar);


           contenedorCitas.appendChild(divCita);

        });   
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}
export default UI;