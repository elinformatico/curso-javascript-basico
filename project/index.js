
// Document Ready
document.addEventListener('DOMContentLoaded', function () {

    let counter=0;
    console.log("¡Ya cargo todo el HTML!");

    document.getElementById("btnAgregar").onclick = function(e) {
        console.log('Procesando almacenamiento.....');
    
        let nombreGasto = document.getElementById("nombreGasto").value;
        let monto = document.getElementById("monto").value;
    
        crearRegistro(nombreGasto, monto);
        limpiarFormulario();
    }
    
    let guardarLocalStorage = function(nombreGasto, monto, idGasto) {
        
        console.log('Guardando en LocalStorage.....');
        // Objeto Gastos
        let objetoGasto = {
            "idGasto"       : idGasto,
            "nombreGasto"   : nombreGasto,
            "monto"         : monto,
        };
    
        // Local Storage
        let miStorage = window.localStorage;
        miStorage.setItem("gastoID:" + idGasto, JSON.stringify(objetoGasto));
    }
    
    let limpiarFormulario = function(){
        document.getElementById("nombreGasto").value = "";
        document.getElementById("monto").value = "";
    };
    
    let crearRegistro = function(gasto, monto) {
    
        console.log('Creando Registro: ', gasto, monto);
        counter++;
    
        // Obtener Tabla
        let tablaGastos = document.getElementById("tablaGastos");
    
        // Creando Elementos
        let tableRow = document.createElement("tr");
        let tdCounter = document.createElement("td"); 
        let tdGasto = document.createElement("td");
        let tdMonto = document.createElement("td");
    
        // Creando un ID al TR
        tableRow.id = counter;
    
        tdCounter.innerHTML = counter;
        tdGasto.innerHTML = gasto;
        tdMonto.innerHTML = monto;
        tableRow.appendChild(tdCounter);
        tableRow.appendChild(tdGasto);
        tableRow.appendChild(tdMonto);
    
        tablaGastos.appendChild(tableRow);
    
        // Guardando en LocalStore
        guardarLocalStorage(gasto, monto, counter);
    }
    
    let loadLocalStorageData = function() {

        let saveElementsNum = window.localStorage.length;
        if(saveElementsNum > 0) {
            for(let i=1; i <= saveElementsNum; i++){

                // SET the index of Global Counter
                counter = i;
                let tableRow = document.createElement("tr");
                let tdCounter = document.createElement("td"); 
                let tdGasto = document.createElement("td");
                let tdMonto = document.createElement("td");

                // Get Elements from LocalStorage
                const row = window.localStorage.getItem("gastoID:" + i);
                let rowObjet = JSON.parse(row);

                // Set ID Row
                tableRow.id = rowObjet.idGasto;
    
                tdCounter.innerHTML = rowObjet.idGasto;
                tdGasto.innerHTML = rowObjet.nombreGasto;
                tdMonto.innerHTML = rowObjet.monto;

                tableRow.appendChild(tdCounter);
                tableRow.appendChild(tdGasto);
                tableRow.appendChild(tdMonto);
            
                tablaGastos.appendChild(tableRow);
            }
        } else {
            console.log('No Hay gastos que mostrar...');
        }
    }

    // Loading localStorage
    loadLocalStorageData();
});



