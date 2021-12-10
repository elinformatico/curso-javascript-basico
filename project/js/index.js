document.addEventListener('DOMContentLoaded', function() {
    
    // GLOBAL INCREMENT
    let counter=0;

    // ********************************************
    agregarGasto = function() 
    {
        console.log('Agregando Gasto...');

        let nombreGasto = document.getElementById('nombreGasto').value;
        let monto = document.getElementById('monto').value;

        guardarGasto(nombreGasto, monto);
        limpiarCampos();
    }
    document.getElementById("btnAgregar").addEventListener("click", agregarGasto);

    
    // ********************************************
    let guardarGasto = function(nombreGasto, monto) 
    {
        counter++;

        // Creando Objetos DOM
        rowFactory(counter, nombreGasto, monto);

        // Guardando en LocalStorage
        guardarLocalStorage(counter, nombreGasto, monto);
    }

    // ********************************************
    let limpiarCampos = function() {
        document.getElementById('nombreGasto').value = "";
        document.getElementById('monto').value = "";
    }

    // ********************************************
    let guardarLocalStorage = function(idGasto, nombreGasto, monto) {

        let miStorage = window.localStorage;

        let objetoGasto = {
            "idGasto"       : idGasto,
            "nombreGasto"   : nombreGasto,
            "monto"         : monto
        }; 

        miStorage.setItem("gastoID:" + idGasto, JSON.stringify(objetoGasto));
    }

    // ********************************************
    let rowFactory = function (idGasto, gasto, monto) 
    {
        let tablaGastos = document.getElementById('tablaGastos');

        let tableRow = document.createElement("tr");
        let tdCounter = document.createElement("td");
        let tdGasto = document.createElement("td");
        let tdMonto = document.createElement("td");

        tableRow.id = idGasto;

        tdCounter.innerHTML = counter;
        tdGasto.innerHTML = gasto;
        tdMonto.innerHTML = monto;

        tableRow.appendChild(tdCounter);
        tableRow.appendChild(tdGasto);
        tableRow.appendChild(tdMonto);

        // ELIMINANDO REGISTROS
        crearBotonEliminarFactory(idGasto, tableRow);

        tablaGastos.appendChild(tableRow);
    }

    // ********************************************
    // ELIMINANDO REGISTROS
    let eliminarAccion = function(e) {
        console.log('Eliminando Elemento: ' + e.target.id);
        document.getElementById(e.target.id).remove();
        window.localStorage.removeItem('gastoID:' + e.target.id);
    }

    let crearBotonEliminarFactory = function(idGasto, trObjet) {

        let tdAccion = document.createElement("td");
        let accionEliminar = document.createElement('button');
        
        accionEliminar.id = idGasto;
        accionEliminar.innerHTML = 'Eliminar';
        //accionEliminar.className = 'btn btn-lg btn-primary';
        accionEliminar.onclick = eliminarAccion;

        tdAccion.appendChild(accionEliminar);
        trObjet.appendChild(tdAccion);
    }

    // ********************************************
    let cargarLocalStorage = function(status) 
    {
        setTimeout(function() 
        {
            let numElement = window.localStorage.length;
            if(numElement > 0){

                let tablaGastos = document.getElementById('tablaGastos');
                
                for(let i=1; i <= numElement; i++){

                    counter = i;
                    let registro = window.localStorage.getItem('gastoID:' + i);
                    let registroObjet = JSON.parse(registro);

                    // Desestructuracion de Objetos
                    let {idGasto, nombreGasto, monto} = registroObjet;

                    rowFactory(idGasto, nombreGasto, monto);
                }
                status({
                    'status' : 'success'
                });

            } else {
                console.log('No hay elementos que cargar....');
                status({
                    'status' : 'error'
                });
            }
        }, 2000);
    }

    // ********************************************
    cargarLocalStorage(function(response)
    {
        if(response.status === 'success') {
            document.getElementById("spinner").style.display = 'none';
            document.getElementById("tablaGastos").style.display = 'block';
        } else {
            
        }
    });
});
