function Seguro(marca, año, tipoSeguro)
{
    this.marca = marca;
    this.año = año;
    this.tipoSeguro = tipoSeguro;
}

Seguro.prototype.cotizarSeguro = function()
{
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */

    let cantidad;
    const base = 2000;

    switch(this.marca)
    {
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.35;
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.año;
    console.log(diferencia);
    
    // Cada año la diferencia es mayor, el costo va a reducirse un 3%

    cantidad -= cantidad * (diferencia * 0.03);

    /*
        Si el seguro es basico +30%
        Si el seguro es completo +50%
    */

    if (this.tipoSeguro === 'basico')
    {
        cantidad *= 1.3;
        console.log(`Seguro de tipo BASICO`);
    }
    else if (this.tipoSeguro === 'completo')
    {
        cantidad *= 1.5;
        console.log(`Seguro de tipo COMPLETO`);
    }

    return cantidad;
}

function UI() {}

UI.prototype.llenarOpciones = () => 
{
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--)
    {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) =>
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
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() =>
    {
        div.remove();
    }, 3000)
}

UI.prototype.mostrarResultado = (total, seguro) => 
{
    const { marca, año, tipoSeguro } = seguro;

    console.log(año);

    let textMarca;

    switch (marca)
    {
        case '1':
            textMarca = 'Americano';
            break;

        case '2':
            textMarca = 'Asiatico';
            break;

        case '3':
            textMarca = 'Europeo';
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = 
    `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${textMarca}</p>
        <p class="font-bold">Año: <span class="font-normal"> ${año}</p>
        <p class="font-bold">Tipo de seguro: <span class="font-normal"> ${tipoSeguro}</p>
        <p class="font-bold">Total: <span class="font-normal"> ${total}</p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() =>
    {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000)
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => 
{
    ui.llenarOpciones();
})

eventListeners();
function eventListeners()
{
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e)
{
    e.preventDefault();

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === "")
    {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        console.log(`Validación incorrecta, revisa los campos otra vez`);
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');
    console.log(`Validación correcta`);

    const resultados = document.querySelector('#resultado div');
    if(resultados != null)
    {
        resultados.remove();
    }

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    console.log(total);

    ui.mostrarResultado(total, seguro);
}

