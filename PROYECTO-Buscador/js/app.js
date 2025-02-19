const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear(); //> Obtienes el año actual
const min = max - 10; 

// General un objeto con la busqueda
const datosBusqueda = 
{
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

document.addEventListener('DOMContentLoaded', () => 
{
    mostrarCoches(coches);

    // Llena las opciones de años
    llenarSelect();
})

// Event listener para los select de busqueda
marca.addEventListener('change', (e) => 
{
    datosBusqueda.marca = e.target.value;

    filtrarCoche();
})
year.addEventListener('change', (e) => 
{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarCoche();
})
minimo.addEventListener('change', (e) => 
{
    datosBusqueda.minimo = e.target.value;

    filtrarCoche();
})
maximo.addEventListener('change', (e) => 
{
    datosBusqueda.maximo = e.target.value;

    filtrarCoche();
})
puertas.addEventListener('change', (e) => 
{
    datosBusqueda.puertas = e.target.value;

    filtrarCoche();
})
transmision.addEventListener('change', (e) => 
{
    datosBusqueda.transmision = e.target.value;

    filtrarCoche();
})
color.addEventListener('change', (e) => 
{
    datosBusqueda.color = e.target.value;

    filtrarCoche();
})

function mostrarCoches(coches)
{
    limpiarHTML(); // Elimina el HTML previo

    coches.forEach( auto => 
    {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHtml = document.createElement('p');

        autoHtml.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - 
            Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        resultado.appendChild(autoHtml);
    })
}

function limpiarHTML()
{
    while(resultado.firstChild)
    {
        resultado.removeChild(resultado.firstChild);
    }   
}

// General los años del select
function llenarSelect()
{
    for(let i = max; i >= min; i--)
    {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

function filtrarCoche()
{
    const resultado = coches.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo)
    .filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    mostrarCoches(resultado);

    if(!resultado.length) noResultado();
}

function noResultado()
{
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = "No hay resultados";
    resultado.appendChild(noResultado);
}

function filtrarMarca(coche)
{
    const {marca} = datosBusqueda;

    if(marca)
    {
        return coche.marca === marca;
    }
    return coche;
}

function filtrarYear(coche)
{
    const {year} = datosBusqueda;

    if(year)
    {
        return coche.year === year;
    }
    return coche;
}

function filtrarMinimo(coche)
{
    const {minimo} = datosBusqueda;

    if(minimo)
    {
        return coche.precio >= minimo;
    }
    return coche;
}

function filtrarMaximo(coche)
{
    const {maximo} = datosBusqueda;

    if(maximo)
    {
        return coche.precio <= maximo;
    }
    return coche;
}

function filtrarPuertas(coche)
{
    const {puertas} = datosBusqueda;

    if(puertas)
    {
        return coche.puertas === puertas;
    }
    return coche;
}

function filtrarTransmision(coche)
{
    const {transmision} = datosBusqueda;

    if(transmision)
    {
        return coche.transmision === transmision;
    }
    return coche;
}

function filtrarColor(coche)
{
    const {color} = datosBusqueda;

    if(color)
    {
        return coche.color === color;
    }
    return coche;
}