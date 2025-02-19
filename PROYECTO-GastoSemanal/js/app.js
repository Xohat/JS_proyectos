// Variables y slectors
const formulario = document.querySelector('#agregar-gasto');

const presupuestoInput = document.querySelector('#presupuesto-input');
const gastoInput = document.querySelector('#gasto');
const cantidadInput = document.querySelector('#cantidad');
const btnAgregar = document.querySelector('#btn-primary');

const presupuestoMostrar = document.querySelector('#presupuesto');

const gastoListado = document.querySelector('#gastos ul');

// Eventos

eventListeners();
function eventListeners()
{
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}

// Clases
class Presupuesto
{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto)
    {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante()
    {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;

        console.log(`RESTANTE TRAS CALCULO: ${this.restante}`);
    }

    eliminarGasto(id)
    {
        this.gastos = this.gastos.filter(gasto => gasto.id.toString() !== id);
        console.log(this.gastos);
        this.calcularRestante();
    }
}

class UI
{
    insertarPresupuesto(cantidad)
    {
        const {presupuesto, restante} = cantidad;

        // Agregar HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    mostrarAlerta(mensaje, tipo)
    {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo == 'error')
        {
            divMensaje.classList.add('alert-danger');
        }

        if(tipo == 'success')
        {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitarlo del HTML
        setTimeout(() =>
        {
            divMensaje.remove();
        }, 3000)
    }

    agregarGastoLista(gastos)
    {
        // Limpiar HTML
        this.limpiarHTML();

        // Iterar sobre los gastos
        gastos.forEach(gasto => 
        {
            const { cantidad, nombre, id } = gasto;

            // Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary bade-pill"> $${cantidad} </span>`;

            // Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.textContent = 'Borrar'
            btnBorrar.onclick = () => 
            {
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);    

            // Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        })
    }

    limpiarHTML()
    {
        while(gastoListado.firstChild)
        {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante)
    {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj)
    {
        const {presupuesto, restante} = presupuestoObj;

        const restanteDiv = document.querySelector('.restante');

        // Comprobar 25%
        if((presupuesto / 4) > restante)
        {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }
        // Comprobar 50%
        else if((presupuesto / 2) > restante)
        {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }
        else
        {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        // Si el total es menor a 0 o menos
        if(restante <= 0)
        {
            ui.mostrarAlerta('Prespuesto menor a 0, cuidado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}

// Instanciar
const ui = new UI();
let presupuesto;

// Funciones

function preguntarPresupuesto()
{
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario))
    {
        window.location.reload();
    }

    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e)
{
    e.preventDefault();

    // Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number( document.querySelector('#cantidad').value);

    // Validar
    if(nombre === '' || cantidad === '')
    {
        ui.mostrarAlerta('Ambos campos son obligatorios', 'error');

        return;
    }
    else if(cantidad <= 0 || isNaN(cantidad))
    {
        ui.mostrarAlerta('Cantidad no válida', 'error');

        return;
    }

    // Genera objeto gasto
    const gasto = {nombre, cantidad, id: Date.now()};

    console.log(gasto);

    // Añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    // Mensaje de confirmacion
    ui.mostrarAlerta('Añadido correctamente', 'success');

    // Imprimir gastos
    const { gastos, restante } = presupuesto;
    ui.agregarGastoLista(gastos);

    // Actualizar restante
    ui.actualizarRestante(restante);

    // Cambiar color del cuadro segun el dinero restante
    ui.comprobarPresupuesto(presupuesto);

    // Reinicia el formulario
    formulario.reset();
}

function eliminarGasto(id)
{
    // Elimina los gastos del objeto
    presupuesto.eliminarGasto(id);

    // Elimina los gastos del HTML
    const { gastos } = presupuesto;
    ui.agregarGastoLista(gastos);

    // Actualizar restante
    ui.actualizarRestante(presupuesto.restante);

    // Cambiar color del cuadro segun el dinero restante
    ui.comprobarPresupuesto(presupuesto);
}

/*
function checkValido(e)
{
    // Solo numeros
    if(e.target.id === "presupuesto")
    {
        if (isNaN(parseInt(e.target.value)))
        {
            // Error mesasge en el futuro, ahora console.log
            console.log("Tipo de dato invalido");
        }
        else
        {
            //Save local stoarge
            console.log("Tipo de dato valido");
        }
    }

    // Solo letras
    if(e.target.id === "gasto")
    {
        if (isNaN(parseInt(e.target.value)))
        {
            //Save local stoarge
            console.log("Tipo de dato valido");
            //crearGasto();
        }
        else
        {
            // Error mesasge en el futuro, ahora console.log
            console.log("Tipo de dato invalido");
            //mensajeError();
        }
    }

    // Solo numeros
    if(e.target.id === "cantidad")
    {   
        if (isNaN(parseInt(e.target.value)))
        {
            // Error mesasge en el futuro, ahora console.log
            console.log("Tipo de dato invalido");
        }
        else
        {
            //Save local stoarge
            console.log("Tipo de dato valido");
        }
    }
}

function crearGasto()
{
    if(gastoInput.value !== "" && cantidadInput.value !== "")
    {
        const nuevoGasto = new Gasto(gastoInput.value, cantidadInput.value);
        console.log(nuevoGasto);
        gastos.push(nuevoGasto);
                
        gastoListado.appendChild(gastos);

        console.log(gastos);
    }
    else console.log("Falta rellenar o Gasto o Cantidad");
}

function mensajeError()
{
    const div = document.createElement('div');

    if(tipo === 'error')
    {
        div.classList.add('mensaje', 'error');
    }
    else
    {
        div.classList.add('mensaje', 'correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // Insertar en el HTML
    const formulario = document.querySelector('#agregar-gasto');
    formulario.appendChild(e.target.parentElement);

    setTimeout(() =>
    {
        div.remove();
    }, 3000)
}
*/
