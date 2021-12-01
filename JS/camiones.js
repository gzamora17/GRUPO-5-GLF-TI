async function guardardata() {
    const response = await fetch('js/coordenadas.txt');
    const data = await response.text();
    const table = data.split('\n');
    table.forEach(row => {
        const column = row.split(';');
        const type = column[0];
        const num = column[1];
        const dirc = column[2];
        const dirc2 = dirc.split(',');
        const x = dirc2[0];
        const y = dirc2[1];
        matrix.push([type, num, x, y]);
    });
}

var matrix = [];
guardardata();

console.log("Aqui se recibió la información del archivo plano: " + matrix);

function creaPuntos() {
    var t_1 = 0, pasaPunto = [], ingresoPuntos = [];
    do {
        if (matrix[t_1][0] == "P") {
            ingresoPuntos.push(matrix[t_1][2]);
            ingresoPuntos.push(matrix[t_1][3]);
            pasaPunto.push(ingresoPuntos);
            ingresoPuntos = [];
            t_1++;
        } else {
            t_1++;
        }
    } while (t_1 < matrix.length);
    return pasaPunto;
}

function creaCentros() {
    var t_2 = 0, pasaCentro = [], ingresoCentros = [];
    do {
        if (matrix[t_2][0] == "C") {
            ingresoCentros.push(matrix[t_1][2]);
            ingresoCentros.push(matrix[t_1][3]);
            pasaCentro.push(ingresoPuntos);
            ingresoCentros = [];
            t_2++;
        } else {
            t_2++;
        }
    } while (t_2 < matrix.length);
    return pasaCentro;
}
var Puntos = creaPuntos();
var Centros = creaCentros();

var contador_pedidos = 1;
// Crea los recuadros para ingresar los pedidos
var InputFields = function () {
    var div = document.createElement("div");
    document.getElementById('inputfield').appendChild(div);
    // Set div ID: Conjunto_Pedidos
    div.setAttribute("id", "Conjunto_Pedidos" + document.getElementById('inputfield').childElementCount);
    div.setAttribute("style", "padding-bottom:25px; display:flex; justify-content:space-around; align-items:center;");

    // Set texto descripcion
    var textd = document.createElement("p");
    textd.setAttribute("style", "color:white;");
    textd.textContent = "Punto de venta N" + contador_pedidos;
    contador_pedidos++;

    // Set inputs: pedidos_q
    var pedidos_q = document.createElement("input")
    pedidos_q.setAttribute("id", "Npedidos" + document.getElementById('inputfield').childElementCount);
    pedidos_q.setAttribute("type", "number");
    pedidos_q.setAttribute("placeholder", "Cantidad de pedidos");
    pedidos_q.setAttribute("style", "width:170px; height:30px; text-align: center; background:white; color:var(--black-fg) ; padding:0px 15px; border:none; border-bottom: 3px solid #00c896;");

    // Append childs
    div.appendChild(textd);
    div.appendChild(pedidos_q);
};
function dynamicInputs() {
    for (let index = 0; index < Puntos.length; index++) {
        InputFields();
    }
}
dynamicInputs();

function creaPedidos() {
    var pedido_listo = [];
    for (i = 1; i <= Puntos.length; i++) {
        var pedido_ingreso = document.getElementById("Npedido" + i).value;
        if (pedido_ingreso > 1000) {
            alert("El valor ingresado en el pedido del Punto de Venta " + i + " es mayor a 1000.");
            console.error("El valor ingresado en el pedido del Punto de Venta " + i + " es mayor a 1000.");
            return 0;
        } else {
            pedido_listo.push(pedido_ingreso);
        }
    }
    return pedido_listo;
}

var Estacionamiento = [0, 0];

var NombrePuntos = op();
function op() {
    var algo = [];
    for (var i_7 = 1; i_7 < Puntos.length + 1; i_7++) {
        var n = "P" + i_7;
        algo.push(n);
    }
    return algo;
}
var NombreCentros = op2();
function op2() {
    var algo = [];
    for (var i_5 = 1; i_5 < Centros.length + 1; i_5++) {
        var n = "C" + i_5;
        algo.push(n);
    }
    return algo;
}


function menorAmayor(Pedidos2, NombrePuntos2, Puntos2) {
    var i = 0, j = i + 1, puente1 = [], puente3 = [], puente2 = [], puente4 = [], puente5 = [], puente6 = [];
    do {
        do {
            if (Pedidos2[i] > Pedidos2[j]) {
                puente1 = Pedidos2[i];
                puente2 = Pedidos2[j];
                puente3 = NombrePuntos2[i];
                puente4 = NombrePuntos2[j];
                puente5 = Puntos2[i];
                puente6 = Puntos2[j];
                Pedidos2.splice(i, 1, puente2);
                Pedidos2.splice(j, 1, puente1);
                NombrePuntos2.splice(i, 1, puente4);
                NombrePuntos2.splice(j, 1, puente3);
                Puntos2.splice(i, 1, puente6);
                Puntos2.splice(j, 1, puente5);
                puente1 = [];
                puente3 = [];
                puente2 = [];
                puente4 = [];
                puente5 = [];
                puente6 = [];
                j = i + 1;
            } else {
                j++;
            }
        } while (j < Pedidos2.length);
        i++;
        j = i + 1;
    } while (i < Pedidos2.length);

    return [Pedidos2, NombrePuntos2, Puntos2];

}


function main(Pedidos_1, NombrePuntos_1, Puntos_1) {
    var [Pedidos1, NombrePuntos1, Puntos1] = menorAmayor(Pedidos_1, NombrePuntos_1, Puntos_1);
    var CaminosEP = [];
    for (var o = 0; o < Puntos1.length; o++) {
        var hip = parseFloat(Math.sqrt((Math.pow(Estacionamiento[1] - Puntos1[o][1], 2)) + (Math.pow(Estacionamiento[0] - Puntos1[o][0], 2))).toFixed(5));
        CaminosEP.push(hip);
    }
    console.log("Recorridos desde los Puntos de Venta al Estacionamiento: " + CaminosEP);
    var CaminosPP = [], ingreso_1 = [], ñ = 0, j = 0;
    do {
        do {
            var hip_1 = parseFloat(Math.sqrt((Math.pow(Puntos1[ñ][1] - Puntos1[j][1], 2)) + (Math.pow(Puntos1[ñ][0] - Puntos1[j][0], 2))).toFixed(5));
            ingreso_1.push(hip_1);
            j++;
        } while (j < Puntos1.length);
        ñ++;
        j = 0;
        CaminosPP.push(ingreso_1);
        ingreso_1 = [];
    } while (ñ < Puntos1.length);

    var CaminosEC = [];
    for (var o_1 = 0; o_1 < Centros.length; o_1++) {
        var hip_2 = parseFloat(Math.sqrt((Math.pow(Estacionamiento[1] - Centros[o_1][1], 2)) + (Math.pow(Estacionamiento[0] - Centros[o_1][0], 2))).toFixed(5));
        CaminosEC.push(hip_2);
    }
    console.log("Recorridos desde el Estacionamiento a los Centros de Distribución: " + CaminosEC);

    var CaminosPC = [], ingreso_2 = [], ñ_1 = 0, j_1 = 0;
    do {
        do {
            var hip_3 = parseFloat(Math.sqrt((Math.pow(Puntos1[ñ_1][1] - Centros[j_1][1], 2)) + (Math.pow(Puntos1[ñ_1][0] - Centros[j_1][0], 2))).toFixed(5));
            ingreso_2.push(hip_3);
            j_1++;
        } while (j_1 < Centros.length);
        ñ_1++;
        j_1 = 0;
        CaminosPC.push(ingreso_2);
        ingreso_2 = [];
    } while (ñ_1 < Puntos1.length);
    console.log("Recorridos desde los Centros de Distribución a los Puntos de Venta: " + CaminosPC);

    var suma = 0, ñ_8 = 0, guarda = [], Camiones = [];

    do {
        suma = suma + Pedidos1[ñ_8];
        guarda.push(NombrePuntos1[ñ_8]);
        if (suma >= 1000) {
            guarda.pop();
            Camiones.push(guarda);
            guarda = [];
            suma = 0;
        } else {
            ñ_8++;
        }
        if (ñ_8 == Pedidos1.length) {
            Camiones.push(guarda);
        }
    } while (ñ_8 < Pedidos1.length);

    var Rutas = [], datos = [], q = 0, m = 0, h = 0;
    do {
        do {
            if (Camiones[q][m] == NombrePuntos1[h]) {
                var w = 0, elMenor = [], lugar = 1;
                elMenor.push(CaminosPC[h][w]);
                do {
                    if (elMenor[0] > CaminosPC[h][w] && elMenor[0] != CaminosPC[h][w]) {
                        elMenor.splice(0, 1, CaminosPC[h][w]);
                        lugar = w + 1;
                        w++;
                    } else {
                        w++;
                    }
                } while (w < Centros.length);
                datos.push(["C" + lugar, elMenor[0], NombrePuntos1[h]]);
                elMenor = [];
                h++;
                if (h > Puntos1.length) {
                    h = 0;
                    m++;
                }
            } else {
                h++;
                if (h > Puntos1.length) {
                    h = 0;
                    m++;
                }
            }
        } while (m < Camiones[q].length);
        Rutas.push(datos);
        datos = [];
        q++;
        h = 0;
        m = 0;
    } while (q < Camiones.length);

    var r = 0;
    do {
        if (Rutas[r].length > 1) {
            var centrosA = [], caminosA = [], puntosA = [];
            for (var te = 0; te < Rutas[r].length; te++) {
                centrosA.push(Rutas[r][te][0]);
                caminosA.push(Rutas[r][te][1]);
                puntosA.push(Rutas[r][te][2]);
            }
            var qm = 0, es = qm + 1, bridgeA = [], bridgeB = [], bridgeC = [], bridgeD = [], bridgeE = [], bridgeF = [];
            do {
                do {
                    if (caminosA[qm] >= caminosA[es]) {
                        bridgeA = centrosA[qm];
                        bridgeB = centrosA[es];
                        bridgeC = caminosA[qm];
                        bridgeD = caminosA[es];
                        bridgeE = puntosA[qm];
                        bridgeF = puntosA[es];
                        centrosA.splice(qm, 1, bridgeB);
                        centrosA.splice(es, 1, bridgeA);
                        caminosA.splice(qm, 1, bridgeD);
                        caminosA.splice(es, 1, bridgeC);
                        puntosA.splice(qm, 1, bridgeF);
                        puntosA.splice(es, 1, bridgeE);
                        bridgeA = [];
                        bridgeB = [];
                        bridgeC = [];
                        bridgeD = [];
                        bridgeE = [];
                        bridgeF = [];
                        es = qm + 1;
                    } else {
                        es++;
                    }
                } while (es < caminosA.length);
                qm++;
                es = qm + 1;
            } while (qm < caminosA.length);

            var tramo = [];
            tramo.push(centrosA[0]);
            tramo.push(caminosA[0]);
            tramo.push(puntosA[0]);
            var nq = 0, lh = nq + 1, primer = 0, segundo = 0;
            do {
                for (var i_1 = 0; i_1 < NombrePuntos1.length; i_1++) {
                    if (puntosA[nq] == NombrePuntos1[i_1]) {
                        primer = i_1;
                    } else {
                        if (puntosA[lh] == NombrePuntos1[i_1]) {
                            segundo = i_1;
                        }
                    }
                }
                tramo.push(CaminosPP[primer][segundo]);
                tramo.push(puntosA[lh]);
                nq++;
                lh = nq + 1;
            } while (lh < puntosA.length);

            for (let i_2 = 0; i_2 < NombrePuntos1.length; i_2++) {
                if (puntosA[segundo] == NombrePuntos1[i_2]) {
                    var primerE = i_2;
                }
            }
            tramo.push(CaminosEP[primerE]);
            Rutas.splice(r, 1, [tramo]);
            r++;
        } else {
            var fe = 0;
            for (var e = 0; e < NombrePuntos1.length; e++) {
                if (NombrePuntos1[e] == Rutas[r][0][2]) {
                    fe = e;
                }
            }
            var tramop = CaminosEP[fe];
            Rutas[r][0].push(tramop);
            r++;
        }
    } while (r < Rutas.length);

    var esto = "E", aquello = 0, aqui = 0, k = 0;
    do {
        for (var bx = 0; bx < NombreCentros.length; bx++) {
            if (NombreCentros[bx] == Rutas[k][0][0]) {
                aqui = bx;
            }
        }
        aquello = CaminosEC[aqui];
        Rutas[k][0].splice(0, 0, aquello);
        Rutas[k][0].splice(0, 0, esto);
        Rutas[k][0].push(esto);
        k++
    } while (k < Rutas.length);

    var TamRutas = Rutas.length;
    console.log("Estas son las rutas de los " + TamRutas + " camiones: ");
    console.log(Rutas);

    var RecorridoTotal = [], sumador = 0, bqp = 1, lwo = 0;
    do {
        do {
            sumador = sumador + Rutas[lwo][0][bqp];
            bqp = bqp + 2;
        } while (bqp < Rutas[lwo][0].length);
        RecorridoTotal.push(parseFloat(sumador).toFixed(5));
        lwo++;
        bqp = 1;
        sumador = 0
    } while (lwo < Rutas.length);
    console.log("Este es el Recorrido total de los " + RecorridoTotal.length + " camiones: " + RecorridoTotal);

    var Tamano_Rutas = [], cuenta = 0;
    do {
        if (Rutas[cuenta][0].length == 7) {
            Tamano_Rutas.push(1)
            cuenta++;
        } else {
            var resta = Rutas[cuenta][0].length - 7;
            var cabe_2 = resta / 2;
            Tamano_Rutas.push(cabe_2+1);
            cuenta++;
        }
    } while (cuenta < Rutas.length);

    console.log(Rutas);
    console.log(RecorridoTotal);
    console.log(Tamano_Rutas);
    
    return [Rutas, RecorridoTotal, Tamano_Rutas];
}

var pasa_camiones = 0;
function printResultado() {
    var Pedidos = creaPedidos();
    var [Rutas_Resultado, Recorrido_Resultado, Tamano_Resultado] = main(Pedidos, NombrePuntos, Puntos);
    var printInPage = document.getElementById('resultadoHTML');
    printInPage.innerHTML = '';

    var cantidadCamiones = document.createElement("p");
    cantidadCamiones.setAttribute("style", "color:var(--accent); font-size: 18px; padding-top: 20px;")
    cantidadCamiones.innerHTML = "La cantidad de camiones necesarias para el día es: " + Rutas_Resultado.length;

    printInPage.appendChild(cantidadCamiones);

    for (let index = 0; index < Rutas_Resultado.length; index++) {
        if (Tamano_Resultado[index] == 1) {
            // Imprime el nombre del camion
            var nombreCamion = document.createElement("p");
            nombreCamion.setAttribute("style", "font-size: 14px; padding-top: 40px;")
            nombreCamion.innerHTML = "Camion numero " + (index + 1);

            // Imprime su informacion contenida en "informacionCamion"
            var informacionCamion = document.createElement("p");
            informacionCamion.setAttribute("style", "margin-left: 45px;")

            var direccionCamion1 = document.createElement("p");
            direccionCamion1.innerHTML = "Sale del estacionamiento hacia " + Rutas_Resultado[index][0][2] + " (Distancia: " + Rutas_Resultado[index][0][1] + " kms.).";
            var direccionCamion2 = document.createElement("p");
            direccionCamion2.innerHTML = "Luego se dirige a " + Rutas_Resultado[index][0][4] + " (Distancia: " + Rutas_Resultado[index][0][3]+" kms.).";
            var direccionCamion3 = document.createElement("p");
            direccionCamion3.innerHTML = "Y finalmente se devuelve al estacionamiento (Distancia: " + Rutas_Resultado[index][0][5]+" kms.).";
            var direccionCamion4 = document.createElement("p");
            direccionCamion4.innerHTML = "La cantidad recorrida total es " + Recorrido_Resultado[index] + " kms.";
            // Append Childs
            informacionCamion.appendChild(direccionCamion1);
            informacionCamion.appendChild(direccionCamion2);
            informacionCamion.appendChild(direccionCamion3);
            informacionCamion.appendChild(direccionCamion4);
            printInPage.appendChild(nombreCamion);
            printInPage.appendChild(informacionCamion);
        } else {
            if (Tamano_Resultado[index] > 1) {
                var nombreCamion = document.createElement("p");
                nombreCamion.setAttribute("style", "font-size: 14px; padding-top: 40px;")
                nombreCamion.innerHTML = "Camion numero " + (index + 1);

                // Imprime su informacion contenida en "informacionCamion"
                var informacionCamion = document.createElement("p");
                informacionCamion.setAttribute("style", "margin-left: 45px;")

                var direccionCamion1 = document.createElement("p");
                direccionCamion1.innerHTML = "Sale del estacionamiento hacia " + Rutas_Resultado[index][0][2] + " (Distancia: " + Rutas_Resultado[index][0][1] + " kms.).";
                var direccionCamion2 = document.createElement("p");
                var ruta_puntos = crea_palabra(); 
                function crea_palabra() {
                    var palabra = "Luego se dirige a ";
                    var paseando=4;
                    do{
                        palabra = palabra + Rutas_Resultado[index][0][paseando] + " (Distancia: " + Rutas_Resultado[index][0][paseando - 1] + " kms.), luego hacia ";
                        paseando=paseando+2;
                    }while(paseando<Rutas_Resultado[index][0].length-2);
                    var palabra_2 = palabra.slice(0, palabra.length - 14);
                    palabra_2 = palabra_2 + "."
                    return palabra_2;
                }
                direccionCamion2.innerHTML = ruta_puntos;
                var distancia_estacionamiento = Rutas_Resultado[index][0].length - 2;
                var direccionCamion3 = document.createElement("p");
                direccionCamion3.innerHTML = "Y por ultimo se devuelve al estacionamiento (Distancia: " + Rutas_Resultado[index][0][distancia_estacionamiento]+" kms.).";
                var direccionCamion4 = document.createElement("p");
                direccionCamion4.innerHTML = "La cantidad recorrida total es " + Recorrido_Resultado[index] + " kms.";
                // Append Childs
                informacionCamion.appendChild(direccionCamion1);
                informacionCamion.appendChild(direccionCamion2);
                informacionCamion.appendChild(direccionCamion3);
                informacionCamion.appendChild(direccionCamion4);
                printInPage.appendChild(nombreCamion);
                printInPage.appendChild(informacionCamion);
            }
        }
    }
}


