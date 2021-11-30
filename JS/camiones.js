var Puntos = [[1, -6], [-15, 35], [90, 8], [7, 7], [11, -8]];
var Centros = [[0, 1], [41, 36], [1, 8]];
var Pedidos = [700, 50, 990, 740, 850];

var TamPunt = Puntos.length;
console.log(TamPunt);

var Estacionamiento = [0, 0];

var NombrePuntos = op();
function op() {
    var algo = [];
    for (var i = 1; i < Puntos.length + 1; i++) {
        var n = "P" + i;
        algo.push(n);
    }
    return algo;
}
console.log(NombrePuntos);
var NombreCentros = op2();
function op2() {
    var algo = [];
    for (var i = 1; i < Centros.length + 1; i++) {
        var n = "C" + i;
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
    var CaminosPP = [], ingreso = [], ñ = 0, j = 0;
    do {
        do {
            var hip = parseFloat(Math.sqrt((Math.pow(Puntos1[ñ][1] - Puntos1[j][1], 2)) + (Math.pow(Puntos1[ñ][0] - Puntos1[j][0], 2))).toFixed(5));
            ingreso.push(hip);
            j++;
        } while (j < Puntos1.length);
        ñ++;
        j = 0;
        CaminosPP.push(ingreso);
        ingreso = [];
    } while (ñ < Puntos1.length);
    CaminosPP

    var CaminosEC = [];
    for (var o = 0; o < Centros.length; o++) {
        var hip = parseFloat(Math.sqrt((Math.pow(Estacionamiento[1] - Centros[o][1], 2)) + (Math.pow(Estacionamiento[0] - Centros[o][0], 2))).toFixed(5));
        CaminosEC.push(hip);
    }
    console.log(CaminosEC);

    var CaminosPC = [], ingreso = [], ñ = 0, j = 0;
    do {
        do {
            var hip = parseFloat(Math.sqrt((Math.pow(Puntos1[ñ][1] - Centros[j][1], 2)) + (Math.pow(Puntos1[ñ][0] - Centros[j][0], 2))).toFixed(5));
            ingreso.push(hip);
            j++;
        } while (j < Centros.length);
        ñ++, j = 0;
        CaminosPC.push(ingreso);
        ingreso = [];
    } while (ñ < Puntos1.length);
    console.log(CaminosPC);

    var suma = 0, ñ = 0, guarda = [], Camiones = [], i = 0;

    do {
        suma = suma + Pedidos1[ñ];
        console.log(suma);
        guarda.push(NombrePuntos1[ñ]);
        if (suma >= 1000) {
            guarda.pop();
            Camiones.push(guarda);
            guarda = [];
            suma = 0;
        } else {
            ñ++;
        }
        if (ñ == Pedidos1.length) {
            Camiones.push(guarda);
        }
    } while (ñ < Pedidos1.length);
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

            caminosA
            var tramo = [];
            tramo.push(centrosA[0]);
            tramo.push(caminosA[0]);
            tramo.push(puntosA[0]);
            var nq = 0, lh = nq + 1, primer = 0, segundo = 0;
            do {
                for (var i = 0; i < NombrePuntos1.length; i++) {
                    if (puntosA[nq] == NombrePuntos1[i]) {
                        primer = i;
                    } else {
                        if (puntosA[lh] == NombrePuntos1[i]) {
                            segundo = i;
                        }
                    }
                }
                tramo.push(CaminosPP[primer][segundo]);
                tramo.push(puntosA[lh]);
                nq++;
                lh = nq + 1;
            } while (lh < puntosA.length);

            for (var i = 0; i < NombrePuntos1.length; i++) {
                if (puntosA[segundo] == NombrePuntos1[i]) {
                    var primerE = i;
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

main(Pedidos, NombrePuntos, Puntos);
