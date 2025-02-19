document.addEventListener('DOMContentLoaded', function()
{
    const email = 
    {
        email: '',
        asunto: '',
        cc: '',
        mensaje: ''
    };

    //Seleccionar los eleemntos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputCC = document.querySelector('#cc');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputCC.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function(e)
    {
        e.preventDefault();

        resetearFormulario();
    })

    function enviarEmail(e)
    {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => 
        {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetearFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 
            'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => 
            {
                alertaExito.remove();
            }, 2000)

        }, 3000)
    }

    function validar(e)
    {    
        if(e.target.value.trim() === '' && e.target.id !== "cc") 
        {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === "email" && !validarEmail(e.target.value)) 
        {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        if(e.target.id === "cc" && e.target.value !== '' && !validarEmail(e.target.value))
        {       
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        quitarAlerta(e.target.value);

        //console.log(e.target.value);

        // Asignar los valores al objeto
        email[e.target.name] = e.target.value.trim().toLowerCase();   
        if(email.cc === '') email.cc = "Sin cc";
        
        console.log(email);

        // Comprobar el email
        comprobarEmail();
    }

    function quitarAlerta(parentElement)
    {
        // Elimina las alertas antiguas de la misma categoria
        const alerta = parentElement.querySelector('.bg-red-600');
        if(alerta) alerta.remove();
    }

    function mostrarAlerta(mensaje, parentElement)
    {
        quitarAlerta(parentElement);

        // Elimina las alertas antiguas de la misma categoria
        const alerta = parentElement.querySelector('.bg-red-600');
        if(alerta) alerta.remove();

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error en el formulario
        parentElement.appendChild(error);
    }

    function validarEmail(email)
    {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail()
    {
        if(Object.values(email).includes(''))
        {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        }
        else 
        {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function resetearFormulario()
    {
        // reniciar el objeto
        email.email = '';
        email.asunto = ''; 
        email.cc = '';       
        email.mensaje = '';
        
        // reiniciar el formulario
        formulario.reset();
        comprobarEmail();
    }
    
    // function revisarTipoDeAlerta(e)
    // {
    //     let returnError = '';

    //     if(e.target.id == 'email') returnError = 'Error con el contenido de email';
    //     else if(e.target.id == 'asunto') returnError = 'Error con el contenido de asunto';
    //     else if(e.target.id == 'mensaje') returnError = 'Error con el contenido de mensaje';
    //     else returnError = 'Hubo un error';

    //     return returnError;
    // }
});