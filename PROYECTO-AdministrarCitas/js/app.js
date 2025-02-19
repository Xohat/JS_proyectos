// Campos Formulario
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

// UI
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

let editando;

class Citas
{
    constructor()
    {
        this.citas = [];
    }

    agregarCita(cita)
    {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id)
    {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada)
    {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

class UI
{
    imprimirAlerta(mensaje, tipo)
    {
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clases
        if (tipo === 'error') divMensaje.classList.add('alert-danger');
        else if (tipo === 'success') divMensaje.classList.add('alert-success');
        else if (tipo === 'warning') divMensaje.classList.add('alert-warning');

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta despues de 5 segundos
        setTimeout( () => 
        {
            divMensaje.remove();
        }, 5000)
    }

    imprimirCitas({citas})
    {
        this.limpiarHTML();

        citas.forEach(cita => 
        { 
            // Extraer la informacion del objeto de cita
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card.title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = 
            `
            <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = 
            `
            <span class="font-weight-bolder">Telefono:</span> ${telefono}
            `
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = 
            `
            <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = 
            `
            <span class="font-weight-bolder">Hora:</span> ${hora}
            `
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = 
            `
            <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
            `
            // Boton eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>`;
            btnEliminar.onclick = () => eliminarCita(id);

            // Boton para editar la cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-success', 'mr-2');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>`;
            btnEditar.onclick = () => editarCita(cita);

            divCita.appendChild(mascotaParrafo); 
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar); 
            divCita.appendChild(btnEditar); 
            
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML()
    {
        while(contenedorCitas.firstChild)
        {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administradorCitas = new Citas();

eventListeners();
function eventListeners()
{
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// Objeto informacion de cita
const citaObj = 
{
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
};

// Agrega datos al objeto de cita
function datosCita(e)
{
    // Esto solo funciona ya que los campos de citaObj 
    // se llaman igual que los name= del HTML

    citaObj[e.target.name] = e.target.value;

    console.log(citaObj);
}

// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e)
{
    e.preventDefault();

    // Extraer la informacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '')
    {
        ui.imprimirAlerta(`Todos los campos son obligatorios`, 'error');
        return;
    }

    if(editando)
    {
        ui.imprimirAlerta("Editando cita");

        // Pasar el objeto de la cita a edicion
        administradorCitas.editarCita({...citaObj});

        // Regresar el texto a su estado original
        formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

        // Quitar la edicion
        editando = false;
    }
    else 
    {
        citaObj.id = Date.now();

        administradorCitas.agregarCita({...citaObj});

        ui.imprimirAlerta('Se agrego correctamente');
    }

    // Genera un ID unico
    citaObj.id = Date.now()

    // Crear nueva cita
    administradorCitas.agregarCita({...citaObj});

    // Resetea los datos del objeto
    resetCitaData();

    // Reiniciar el fomrulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administradorCitas);
}

function resetCitaData()
{
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function editarCita(cita)
{
    // Extraer la informacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas} = cita;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;

    // Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = "Guardar cambios";

    editando = true;
}

function eliminarCita(id)
{
    administradorCitas.eliminarCita(id);

    ui.imprimirAlerta('La cita se elimino correctamente', 'success');

    ui.imprimirCitas(administradorCitas);
}