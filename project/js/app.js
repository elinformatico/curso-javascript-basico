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
  
        rowFactory(counter, gasto, monto);

        guardarLocalStorage(gasto, monto, counter);
    }

    let rowFactory = function(idGasto, gasto, monto) {

        let tablaGastos = document.getElementById('tablaGastos');

        let tableRow = document.createElement("tr");
        let tdCounter = document.createElement("td");
        let tdGasto = document.createElement("td");
        let tdMonto = document.createElement("td");

        tableRow.id = counter;

        tdCounter.innerHTML = idGasto;
        tdGasto.innerHTML = gasto;
        tdMonto.innerHTML = monto;

        tableRow.appendChild(tdCounter);
        tableRow.appendChild(tdGasto);
        tableRow.appendChild(tdMonto);

        // Creando boton para eliminar
        crearBotonEliminarFactory(idGasto, tableRow);

        tablaGastos.appendChild(tableRow);
    }

    let eliminarAccion = function(e) {
        console.log(e.target.id);
        document.getElementById(e.target.id).remove();
        window.localStorage.removeItem('gastoID:' + e.target.id);
    }
    let crearBotonEliminarFactory = function(idGasto, trObjet){
        
        let tdAccion = document.createElement('td');
        let tdBotonEliminar = document.createElement('button');

        tdBotonEliminar.id = idGasto;
        tdBotonEliminar.innerHTML = "Eliminar";
        tdBotonEliminar.onclick = eliminarAccion;

        tdAccion.appendChild(tdBotonEliminar);
        trObjet.appendChild(tdAccion);
    }

    let cargarLocalStorage = function(status) {

        setTimeout(function(){

            let numElement = window.localStorage.length;

            if(numElement > 0){

                let tablaGastos = document.getElementById('tablaGastos');
                
                for(let i=1; i <= numElement; i++){

                    counter = i;
                    let registro = window.localStorage.getItem('gastoID:' + i);
                    let registroObjet = JSON.parse(registro);

                    let {idGasto, nombreGasto, monto} =  registroObjet;
                    rowFactory(idGasto, nombreGasto, monto);
                }

                status(
                    {
                        'status' : 'success'
                    }
                );

            } else {
                status(
                    {
                        'status' : 'fail',
                        'message' : 'No hay gastos registrados'
                    }
                );
                console.log('No hay elementos que cargar....')
            }
        }, 3000);
    }

    cargarLocalStorage(function(response){
        if(response.status === 'success'){
            document.getElementById("spinner").style.display = 'none';
            document.getElementById("tablaGastos").style.display = 'block';
        } else {
            document.getElementById("spinner").style.display = 'none';
            document.getElementById("errorMessage").innerHTML = response.message;
            document.getElementById("errorMessage").style.display = 'block';
        }
        console.log(status);
    });
});
