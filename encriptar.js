
const patronEncriptar = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat",
}

const msjEncriptados = {};
let respuesta = "";


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

}


function desEncriptar(msj) {

    let claveIncriptada = (msj.length > 10) ? msj.slice(0,11) : msj;
    let msjDesencriptado = "";

    msjDesencriptado = (msjEncriptados[claveIncriptada]) ?  msjEncriptados[claveIncriptada] : desEncriptarDesconcido(msj);

    console.log(msjDesencriptado);

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

encriptador("ingrese el texto aqui");
desEncriptar(respuesta);
//desEncriptar("fenterlimescimesdaidenters poberr enternfrenterntair enterstenter dentersaifimesober y haibenterrlober cobernclufatimesdober cobern enterximestober!");