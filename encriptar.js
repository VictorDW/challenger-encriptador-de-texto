/*Variables para darle funcionalidad a la vista */
const input_texto = document.querySelector('#input-Texto');
const btn_encriptar = document.querySelector("#btn-encriptar");
const btn_desencriptar = document.querySelector("#btn-desencriptar");
const conte_info_resultado = document.querySelector('#conte-info-resultado');
const conte_mjsEncriptado = document.querySelector('#conte-mjsEncriptado');
const input_mjsEncriptado = document.querySelector('#input-mjsEncriptado');
const btn_copiar = document.querySelector('#btn-copiar');

/*Variables para lo logica de encriptar y desencriptar */

const patronEncriptar = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat",
}

const msjEncriptados = {};

// FUNCIONES PARA DARLE MANEJO A LOS ELEMENTOS DEL HTML

// Evento que permite saber si el textarea tiene el foco

input_texto.addEventListener("focus", ()=> {

    if (input_texto.value == "Ingrese el texto aqui") input_texto.value = "";
});

// Evento que permite saber si el textarea pierde el foco

input_texto.addEventListener("blur", ()=> {

    if (!input_texto.value) {

        input_texto.value = "Ingrese el texto aqui";
        conte_info_resultado.style.display = 'flex';
        conte_mjsEncriptado.style.display = 'none';
    }
        
});

// Evento que permite llamar a la funcion que encripta los mensajes

btn_encriptar.addEventListener("click", ()=> {

    if(!(input_texto.value === "Ingrese el texto aqui" || input_texto.value === " ")) {

        if(getComputedStyle(conte_info_resultado).display === "flex") {

            conte_info_resultado.style.display = 'none';
            conte_mjsEncriptado.style.display = 'flex';
            encriptador(input_texto.value);
        }else{
            encriptador(input_texto.value);
        }
    }
});

// Evento que permite llamar a la funcion que desencripta los mensajes

btn_desencriptar.addEventListener("click", () => {

    // se evalua que lo que se vaya a descriptar no se a ni un vacio ni el mensaje informativo

    if(!(input_texto.value === "Ingrese el texto aqui" || input_texto.value === " ")) {

        // se evalua si el contenedor informativo es el que esta visible, si es asi se muestra el contenedor con el mensaje y se oculta el otro

        if(getComputedStyle(conte_info_resultado).display === "flex") {

            conte_info_resultado.style.display = 'none';
            conte_mjsEncriptado.style.display = 'flex';
            desEncriptar(input_texto.value);
            
        }else{
            desEncriptar(input_texto.value);
        }
    }
});

// evento que permite copiar el texto

btn_copiar.addEventListener("click", () => { 

    // se hace la petición a la API Clipboard y se recibe una promesa
    navigator.clipboard.writeText(input_mjsEncriptado.innerText)
    .then(function() {
      
     // console.log('Texto copiado al portapapeles: ' + input_mjsEncriptado.innerText);
      
     // en este bloque de codigo se maneja el evento para avisar que se a copiado mediante un pop up
      conte_mjsEncriptado.classList.add("active");

      setTimeout(()=> {

        conte_mjsEncriptado.classList.remove("active");
      },2500);
    })
    .catch(function(error) {
      console.error('Error al copiar el texto: ', error);
    });
});



// FUNCIONES QUE REALIZAN LA LOGICA DE ENCRIPTAR Y DESENCRIPTAR EL MENSAJE


// --- Funcion que permite recorrer el texto y crear el mensaje encriptado que se guarda en el objeto

function encriptador(msjOriginal) {

    let msj = msjOriginal.toLowerCase();
    let mjsEncriptado = "";
    let claveMsj = "";

    for (let i = 0; i < msj.length;i++) {

        mjsEncriptado += (patronEncriptar[msj[i]]) ? patronEncriptar[msj[i]] : msj[i];
    }

    // se guarda la clave reducida si la extencion del mensaje es mayor a 10 caracteres
    claveMsj = (mjsEncriptado.length > 10) ?  mjsEncriptado.slice(0,11) : mjsEncriptado;

    msjEncriptados[claveMsj] = msj; // se almacena la clave que es el mensaje incriptado y el mensaje original

    input_mjsEncriptado.innerText = mjsEncriptado; // se muestra el mensaje incriptado en la vista
}


// --- Funcion que permite desencriptar el mensaje, si ya existe anteriormente como mensajes incriptados.

function desEncriptar(msj) {

    let claveIncriptada = (msj.length > 10) ? msj.slice(0,11) : msj; // se reduce el mensaje a desencriptar para darle un mejor manejo
    let msjDesencriptado = "";

    // se evalua si ya existe ese mensaje encriptado, de ser asi simplemente se extrae del objecto que los alamcena, sino se pasa a otra función que obtiene el mensaje
    msjDesencriptado = (msjEncriptados[claveIncriptada]) ?  msjEncriptados[claveIncriptada] : desEncriptarDesconcido(msj); 

    input_mjsEncriptado.innerText = msjDesencriptado; // se muestra el mensaje desencriptado en la vista

}


// --- Funcion que decifra los mensajes que no son incriptados por la misma aplicacion

function desEncriptarDesconcido(mjsDescocido) {

    let msjDesencriptado = "";

    for(let i=0; i<mjsDescocido.length;) {

        /* 
          mediante el mismo patron de encriptacion, se desifran los desconocidos

          - 1. Evaluando si el caracter existe en el objeto patronEncriptador, sino es asi es porque es una caracter normal y se suma +1
          - 2. en caso de que ya exista en el objeto, se estrae el valor y se toma el primer caracter, luego se suma el largo de frese,
               con el fin de que se recorran solo los caracteres necesario y se decifre el mensaje.
        */
        (patronEncriptar[mjsDescocido[i]]) ? 
                                (msjDesencriptado += (patronEncriptar[mjsDescocido[i]])[0], i+= patronEncriptar[mjsDescocido[i]].length) : 
                                (msjDesencriptado += mjsDescocido[i], i++);
    }

    return msjDesencriptado;
}

//encriptador("ingrese el texto aqui");
//desEncriptar(respuesta);
//desEncriptar("fenterlimescimesdaidenters"); 

