
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

startEventListeners();

function startEventListeners()
{
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () =>
    {     
        tweets = JSON.parse(localStorage.getItem('Tweets')) || [];

        crearHTML();
    });
}

function agregarTweet(e)
{
    e.preventDefault();

    if(tweets !== "")
    {
        localStorage.removeItem('Tweets');
    }

    const tweet = document.querySelector('#tweet').value;

    const tweetObj = 
    {
        id: Date.now(),
        texto: tweet
    }

    if(tweet === "")
    {
        mostrarError("Un mensaje no puede ir vacio");
    }
    else
    {
        tweets.push(tweetObj);

        console.log(`El tweet guardado es: ${tweet}`);
        //console.log(tweets);  
        crearHTML();      
    }

    sincronizarLocalStorage();
}

function mostrarError(error)
{
    // // Elimina las alertas antiguas de la misma categoria
    // const alerta = e.target.parentElement.querySelector('.error');
    // if(alerta) alerta.remove();

    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => 
    {
        mensajeError.remove();
    }, 3000);
}

function sincronizarLocalStorage()
{
    localStorage.setItem('Tweets', JSON.stringify(tweets));
}

function crearHTML()
{
    limpiarHTML();

    console.log(tweets);

    if(tweets.length > 0)
    {
        tweets.forEach((tweet) => 
            {
                // Agregar boton de eiliminar
                const btnEliminar = document.createElement('a');
                btnEliminar.classList.add('borrar-tweet');
                btnEliminar.innerText = 'X';

                // Añadir la funcion de eleimianr
                btnEliminar.onclick = () =>
                {
                    borrarTweet(tweet.id);
                }

                // Crear el HTML

                // Creas el li
                const li = document.createElement('li');

                // Escribes en html
                li.innerText = tweet.texto;

                // Asignar el boton
                li.appendChild(btnEliminar);

                // Insertarlo en el HTML
                listaTweets.appendChild(li);
            })
    }
}

function borrarTweet(id)
{
    tweets = tweets.filter((tweet) => tweet.id !== id);

    crearHTML();
    sincronizarLocalStorage();
}

function limpiarHTML()
{
    while(listaTweets.firstChild)
    {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

