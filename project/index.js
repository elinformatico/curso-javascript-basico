document.addEventListener('DOMContentLoaded', function(){
    console.log('Ya se cargo la pagina...');

    document.getElementById("btnAgregar").onclick = function(){

        console.log('Agregando Gasto...');

        let nombreGasto = document.getElementById('nombreGasto').value;
        let monto = document.getElementById('monto').value;

        crearRegistro(nombreGasto, monto);
        limpiarCampos();
    }

    let limpiarCampos = function() {
        document.getElementById('nombreGasto').value = "";
        document.getElementById('monto').value = "";
    }

    let guardarLocalStorage = function(nombreGasto, monto, idGasto) {

        let miStorage = window.localStorage;

        let objetoGasto = {
            "idGasto"       : idGasto,
            "nombreGasto"   : nombreGasto,
            "monto"         : monto
        }; 

        miStorage.setItem("gastoID:" + idGasto, JSON.stringify(objetoGasto));
    }

    let counter=0;
    let crearRegistro = function (gasto, monto) {

        counter++;
        let tablaGastos = document.getElementById('tablaGastos');

        let tableRow = document.createElement("tr");
        let tdCounter = document.createElement("td");
        let tdGasto = document.createElement("td");
        let tdMonto = document.createElement("td");

        tableRow.id = counter;

        tdCounter.innerHTML = counter;
        tdGasto.innerHTML = gasto;
        tdMonto.innerHTML = monto;

        tableRow.appendChild(tdCounter);
        tableRow.appendChild(tdGasto);
        tableRow.appendChild(tdMonto);

        tablaGastos.appendChild(tableRow);

        guardarLocalStorage(gasto, monto, counter);
    }

    let cargarLocalStorage = function() {

        let numElement = window.localStorage.length;

        if(numElement > 0){

            let tablaGastos = document.getElementById('tablaGastos');
            
            for(let i=1; i <= numElement; i++){

                counter = i;
                let tableRow = document.createElement("tr");
                let tdCounter = document.createElement("td");
                let tdGasto = document.createElement("td");
                let tdMonto = document.createElement("td");

                let registro = window.localStorage.getItem('gastoID:' + i);
                let registroObjet = JSON.parse(registro);

                tableRow.id = registroObjet.idGasto;

                tdCounter.innerHTML = registroObjet.idGasto;
                tdGasto.innerHTML = registroObjet.nombreGasto;
                tdMonto.innerHTML = registroObjet.monto;

                tableRow.appendChild(tdCounter);
                tableRow.appendChild(tdGasto);
                tableRow.appendChild(tdMonto);

                tablaGastos.appendChild(tableRow);
            }

        } else {
            console.log('No hay elementos que cargar....')
        }
    }

    cargarLocalStorage();
});
