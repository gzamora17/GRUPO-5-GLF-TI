var Puntos = [[1, -6], [-15, 35], [90, 8], [7, 7], [11, -8]];
var Centros = [[0, 1], [41, 36], [1, 8]];
var Pedidos = [700, 50, 990, 740, 850];

// var TamPunt = Puntos.length;
// console.log(TamPunt);

// Crea los recuadros para ingresar puntos
var InputFields = function() {
    var div = document.createElement("div");
    document.getElementById('inputfield').appendChild(div);
    // Set div ID: Trans+#n
    div.setAttribute("id", "Trans" + document.getElementById('inputfield').childElementCount);
    div.setAttribute("style", "padding-bottom:20px; display:flex; justify-content:space-around; align-items:center;");

    // Set texto descripcion
    var textd = document.createElement("p");
    textd.setAttribute("style", "color:white;");
    textd.textContent = "ingrese punto";

    // Set inputs: inicio
    var inicio = document.createElement("input")
    inicio.setAttribute("id", "inicio" + document.getElementById('inputfield').childElementCount);
    inicio.setAttribute("type","text");
    inicio.setAttribute("placeholder", "Inicio");
    inicio.setAttribute("style", "width:120px;background:white; height:25px; border:none; border-bottom: 2px solid #00c896;");

    // Append childs
    div.appendChild(textd);
    div.appendChild(inicio);
};
function dynamicInputs(){
    for (let index = 0; index < Puntos.length; index++) {
        InputFields();
    }
}
dynamicInputs();

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
console.log(NombrePuntos);
var NombreCentros = op2();
function op2() {
    var algo = [];
    for (var i_5 = 1; i_5 < Centros.length + 1; i_5++) {
        var n = "C" + i_5;
        algo.push(n);
    }
    return algo;
}
console.log(NombreCentros);

function menorAmayor(Pedidos2, NombrePuntos2, Puntos2) {
    var i = 0, j = i + 1, puente1 = [], puente3 = [], puente2 = [], puente4 = [], puente5 = [], puente6 = [];
    console.log(Pedidos2); console.log(NombrePuntos2); console.log(Puntos2);
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
    console.log(Pedidos2);
    console.log(NombrePuntos2);
    console.log(Puntos2);

    return [Pedidos2, NombrePuntos2, Puntos2];

}


function main(Pedidos_1, NombrePuntos_1, Puntos_1) {
    var [Pedidos1, NombrePuntos1, Puntos1] = menorAmayor(Pedidos_1, NombrePuntos_1, Puntos_1);
    var CaminosEP = [];
    for (var o = 0; o < Puntos1.length; o++) {
        var hip = parseFloat(Math.sqrt((Math.pow(Estacionamiento[1] - Puntos1[o][1], 2)) + (Math.pow(Estacionamiento[0] - Puntos1[o][0], 2))).toFixed(5));
        CaminosEP.push(hip);
    }
    console.log(CaminosEP);
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
    console.log(CaminosEC);

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
    console.log(CaminosPC);

    var suma = 0, ñ_8 = 0, guarda = [], Camiones = [];

    do {
        suma = suma + Pedidos1[ñ_8];
        console.log(suma);
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
    console.log(Camiones);
    console.log(CaminosPC[1][0])

    var Rutas = [], datos = [], q = 0, m = 0, h = 0;
    do {
        do {
            if (Camiones[q][m] == NombrePuntos1[h]) {
                var w = 0, elMenor = [], lugar = 1;
                elMenor.push(CaminosPC[h][w]);
                do {
                    if (elMenor[0] > CaminosPC[h][w] && elMenor[0] != CaminosPC[h][w]) {
                        console.log(CaminosPC[h][w])
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

    console.log(Rutas);

    var r = 0;

    do {
        if (Rutas[r].length > 1) {
            console.log(Rutas[r].length)
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
            console.log(Rutas[r]);
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
    console.log(Rutas)

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
    console.log(TamRutas);
    console.log(Rutas);

}

function printResultado() {
    var printInPage = document.getElementById('resultadoHTML');
    printInPage.innerHTML = '';

    var cantidadCamiones = document.createElement("p");
    cantidadCamiones.setAttribute("style","color:var(--accent); font-size: 18px; padding-top: 20px;")
    cantidadCamiones.innerHTML = "La cantidad de camiones necesarias para el día es: ";

    printInPage.appendChild(cantidadCamiones);

    for (let index = 0; index < 3; index++) {
        // Imprime el nombre del camion
        var nombreCamion = document.createElement("p");
        nombreCamion.setAttribute("style","font-size: 14px; padding-top: 40px;")
        nombreCamion.innerHTML = "Camion numero ..";

        // Imprime su informacion contenida en "informacionCamion"
        var informacionCamion = document.createElement("p");
        informacionCamion.setAttribute("style", "margin-left: 45px;")
        
        var direccionCamion1 = document.createElement("p");
        direccionCamion1.innerHTML = "Sale del estacionamiento hacia -- ; Distancia: --";
        var direccionCamion2 = document.createElement("p");
        direccionCamion2.innerHTML = "Luego fue al punto de venta -- ; Distancia: --";
        var direccionCamion3 = document.createElement("p");
        direccionCamion3.innerHTML = "Y luego se devolvio al estacionamiento ; Distancia: --";
        var direccionCamion4 = document.createElement("p");
        direccionCamion4.innerHTML = "La cantidad recorrida total es -- ; Distancia: --";
        
        // Append Childs
        informacionCamion.appendChild(direccionCamion1);
        informacionCamion.appendChild(direccionCamion2);
        informacionCamion.appendChild(direccionCamion3);
        informacionCamion.appendChild(direccionCamion4);
        printInPage.appendChild(nombreCamion);
        printInPage.appendChild(informacionCamion);
    }
}

main(Pedidos, NombrePuntos, Puntos);
