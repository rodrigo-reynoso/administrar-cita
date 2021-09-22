import{datosCita,nuevaCita} from '../funciones.js'
import {
    mascotaInput,
    propitarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from '../selectores.js'
class App{
    constructor(){
        this.initApp();
    }
    initApp(){
        mascotaInput.addEventListener('change',datosCita);
        propitarioInput.addEventListener('input',datosCita);
        telefonoInput.addEventListener('change',datosCita);
        fechaInput.addEventListener('input',datosCita);
        horaInput.addEventListener('change',datosCita);
        sintomasInput.addEventListener('input',datosCita);
    
        formulario.addEventListener('submit',nuevaCita);
    }
}
export default App;