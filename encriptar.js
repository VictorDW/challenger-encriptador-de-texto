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

// funciones para darle manejo a los elementos del HTML

input_texto.addEventListener("focus", ()=> {

    if (input_texto.value == "Ingrese el texto aqui") input_texto.value = "";
});

input_texto.addEventListener("blur", ()=> {

    if (!input_texto.value) {

        input_texto.value = "Ingrese el texto aqui";
        conte_info_resultado.style.display = 'flex';
        conte_mjsEncriptado.style.display = 'none';
    }
        
});

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

btn_desencriptar.addEventListener("click", () => {

    if(!(input_texto.value === "Ingrese el texto aqui" || input_texto.value === " ")) {

        if(getComputedStyle(conte_info_resultado).display === "flex") {

            conte_info_resultado.style.display = 'none';
            conte_mjsEncriptado.style.display = 'flex';
            desEncriptar(input_texto.value);
            
        }else{
            desEncriptar(input_texto.value);
        }
    }
});

btn_copiar.addEventListener("click", () => { 

    navigator.clipboard.writeText(input_mjsEncriptado.innerText)
    .then(function() {
      
      console.log('Texto copiado al portapapeles: ' + input_mjsEncriptado.innerText);
      
      conte_mjsEncriptado.classList.add("active");

      setTimeout(()=> {

        conte_mjsEncriptado.classList.remove("active");
      },2500);
    })
    .catch(function(error) {
      console.error('Error al copiar el texto: ', error);
    });
});



// Funciones que realizan la logica de encriptar y desencriptar el mensaje


function encriptador(msj) {

    let mjsEncriptado = "";
    let claveMsj = "";

    for (let i = 0; i < msj.length;i++) {

        mjsEncriptado += (patronEncriptar[msj[i]]) ? patronEncriptar[msj[i]] : msj[i];
    }

    claveMsj = (mjsEncriptado.length > 10) ?  mjsEncriptado.slice(0,11) : mjsEncriptado;

    respuesta = mjsEncriptado

    msjEncriptados[claveMsj] = msj;

   console.log(msjEncriptados);
    input_mjsEncriptado.innerText = mjsEncriptado; 

}


function desEncriptar(msj) {

    let claveIncriptada = (msj.length > 10) ? msj.slice(0,11) : msj;
    let msjDesencriptado = "";

    msjDesencriptado = (msjEncriptados[claveIncriptada]) ?  msjEncriptados[claveIncriptada] : desEncriptarDesconcido(msj);

    console.log(msjDesencriptado);
    input_mjsEncriptado.innerText = msjDesencriptado;

}


function desEncriptarDesconcido(mjsDescocido) {

    let msjDesencriptado = "";
    console.log("entro aca");

    for(let i=0; i<mjsDescocido.length;) {

        (patronEncriptar[mjsDescocido[i]]) ? 
                                (msjDesencriptado += (patronEncriptar[mjsDescocido[i]])[0], i+= patronEncriptar[mjsDescocido[i]].length) : 
                                (msjDesencriptado += mjsDescocido[i], i++);
    }

    return msjDesencriptado;
}

//encriptador("ingrese el texto aqui");
//desEncriptar(respuesta);
//desEncriptar("fenterlimescimesdaidenters"); 

