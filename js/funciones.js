import Citas from './clases/Citas.js'
import UI from './clases/UI.js'
import {
    mascotaInput,
    propitarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from './selectores.js'

// inicializar
const ui = new UI();
const administrarCitas = new Citas();

// Modo edición
let editando;

// Objeto principal
const citasObj ={
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
}

// Agrega datos al Objeto principal
export function datosCita(e){ //  IMPORTANTE después de target son los atributos y para que este metodo funcione tiene que tener el atributo name en la etiqueta
    // Esto es para que pueda llenar el objeto con una sola función sino lo tendría que hacer en cada uno una funcion con la sintasis de punto citasObj.fecha x ej.  
        citasObj[e.target.name]= e.target.value;
        console.log(citasObj)
    }
// Válida y agrega una nueva cita a la clase de citas
export function nuevaCita(e){
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
export function reiniciarCitasObj(){
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
    citasObj.id = '';
}

export function eliminarCita(id){
    administrarCitas.eliminarCita(id);
    ui.imprimirAlerta('La cita fue eliminada correctamente');
    ui.imprimirCita(administrarCitas);
}
// Buena parte para prestar atención y entender
// IMPROTANTE--- Cargar los datos y modo edición
export function cargarEdicion(cita){ 
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

    