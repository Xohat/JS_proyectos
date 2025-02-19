// Variables
const carrito = document.querySelector('#carrito');
/// La mayoria de us seletores son const
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoButton = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

// Event listeners
cargarEventListener();
function cargarEventListener() 
{
    // Agregear curso al carrito al clickas el boton
    listaCursos.addEventListener('click', agregarCurso)
    
    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Borra el carrito
    vaciarCarritoButton.addEventListener('click', borrarCarrito);

    document.addEventListener('DOMContentLoaded', () =>
    {     
        articulosCarrito = JSON.parse(localStorage.getItem('Cursos-temp')) || [];

        carritoHTML();
    });
}

// Funciones
function agregarCurso(e)
{
    // Esto impide que se vaya hacia arriba al clickar
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito'))
    {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement);
        leerDatosCurso(cursoSeleccionado);
        sincronizarLocalStorage();
    }
}

function borrarCarrito()
{
    articulosCarrito = [];
    carritoHTML();
}

function eliminarCurso(e)
{
    if(e.target.classList.contains('borrar-curso'))
    {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del array por el data-id
        articulosCarrito = articulosCarrito.filter( (curso) => curso.id !== cursoId);

        carritoHTML(); // Volvemos a iterar sobre el carrito y mostrar su HTML
    }
}

function leerDatosCurso(course)
{
    console.log(course);

    // Crear un objeto con el contenido del curso
    const infoCurso = 
    {
        imagen: course.querySelector('img').src,
        titulo: course.querySelector('h4').textContent,
        precio: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si el elemento es un duplicado
    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
    if(existe) 
    {
        // Actualiza la cantidad de ese curso repetido
        const cursos = articulosCarrito.map( curso => 
            {
                if( curso.id === infoCurso.id )
                {
                    curso.cantidad += 1; 
                    return curso; // retorna los duplicados
                }
                else { return curso; } // retorna los no duplicados
            })
    }
    else 
    {   
        // Agrega curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    console.log(articulosCarrito);
    carritoHTML();
}

// Creacion de carrito en el HTML

function carritoHTML()
{
    limpiarHTML();

    articulosCarrito.forEach((curso) =>
    {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src ="${curso.imagen}" width = "100">
            </td>
            <td> ${curso.titulo} </td>
            <td> ${curso.precio} </td>
            <td> ${curso.cantidad} </td>
            <td> 
                <a href = "#" class="borrar-curso" data-id="${id}"> X </a> 
            </td>
        `;

        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML()
{
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild)
    {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function sincronizarLocalStorage()
{
    localStorage.setItem('Cursos-temp', JSON.stringify(articulosCarrito));
}