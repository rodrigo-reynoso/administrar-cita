// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propitarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// Modo edición
let editando;
// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// Objeto principal
const citasObj ={
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
}

class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas,cita]
        console.log(this.citas)
    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita=>cita.id !== id);
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map(cita=>cita.id===citaActualizada.id ? citaActualizada : cita);
    }
}
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
// inicializar
const ui = new UI();
const administrarCitas = new Citas();

// Registrar eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('change',datosCita);
    propitarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('change',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('change',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit',nuevaCita);
}

// Agrega datos al Objeto principal
function datosCita(e){ //  IMPORTANTE después de target son los atributos y para que este metodo funcione tiene que tener el atributo name en la etiqueta
// Esto es para que pueda llenar el objeto con una sola función sino lo tendría que hacer en cada uno una funcion con la sintasis de punto citasObj.fecha x ej.  
    citasObj[e.target.name]= e.target.value;
    console.log(citasObj)
}

// Válida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();
    const {mascota,propietario,telefono,fecha,hora,sintomas} = citasObj;
    // Validación
    if(mascota===''||propietario===''||telefono===''||fecha===''||hora===''||sintomas===''){
        ui.imprimirAlerta('Todos los campos son obligatorios','error')
        return;
    }

    if(editando===true){ 
        ui.imprimirAlerta('Editado correctamente');
        administrarCitas.editarCita({...citasObj});
        document.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        // IMPORTANTE --corta el modo edicion
        editando = false;
    } else { // de primera, modo edicion apagado no tiene ningún valor underfined
        citasObj.id = Date.now();
        administrarCitas.agregarCita({...citasObj})
        ui.imprimirAlerta('Agregada correctamente')
    }
 // hago una copia de citasObj para que no tome los atributos del objeto principal citasObj
    
    ui.imprimirCita(administrarCitas);
    // Reinicio formulario y objeto principal de citasObj
    formulario.reset();
    reiniciarCitasObj();

}

function reiniciarCitasObj(){
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
    citasObj.id = '';
}

function eliminarCita(id){
    administrarCitas.eliminarCita(id);
    ui.imprimirAlerta('La cita fue eliminada correctamente');
    ui.imprimirCita(administrarCitas);
}

// Buena parte para prestar atención y entender
// IMPROTANTE--- Cargar los datos y modo edición
function cargarEdicion(cita){ 
    editando = true;
    const {mascota,propietario,telefono,fecha,hora,sintomas,id}= cita;
    mascotaInput.value = mascota;
    propitarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Los vuelvo a cargar porque el objeto general esta vacio
    // en este momento el obj general esta vacio
    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    citasObj.id = id;
    console.log(citasObj)
    // Para hacerlo mas dinámico cambio el nombre del button
    document.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

}