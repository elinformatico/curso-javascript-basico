
const mockData = {
    gastos1 : [],
    gastos : [
        {
            "idGasto"       : 1,
            "nombreGasto"   : 'Tortas Ahogadas',
            "monto"         : 102
        },
        {
            "idGasto"       : 2,
            "nombreGasto"   : 'Yogurt Alpura',
            "monto"         : 29
        },
        {
            "idGasto"       : 3,
            "nombreGasto"   : '1kg Carne de Res',
            "monto"         : 80
        },
        {
            "idGasto"       : 4,
            "nombreGasto"   : 'Paquetaxo Queso',
            "monto"         : 68
        },
        {
            "idGasto"       : 5,
            "nombreGasto"   : 'Six de Cerveza Modelo',
            "monto"         : 120
        },
        {
            "idGasto"       : 6,
            "nombreGasto"   : 'Cocholate Abuelita',
            "monto"         : 56.8
        },
        {
            "idGasto"       : 7,
            "nombreGasto"   : 'Salchichas Fud',
            "monto"         : 89.9
        },
        {
            "idGasto"       : 8,
            "nombreGasto"   : 'Queso Oaxaca 1/2',
            "monto"         : 76
        },
        {
            "idGasto"       : 9,
            "nombreGasto"   : 'Fruta Variada',
            "monto"         : 210.4
        },
        {
            "idGasto"       : 10,
            "nombreGasto"   : 'Galletas Marias',
            "monto"         : 15
        },
    ]
};

function getDataGastosSync(url){
    return {
        url    : url,
        status : '200',
        data : mockData.gastos
    }
}

function getDataGastosAsync(url, response, error) {
    if(mockData.gastos.length > 0){
        setTimeout(function(){
            response({
                url     : url,
                status  : '200',
                data    : mockData.gastos,
                message : 'Los Datos se obtuvieron Exitosamente'
            })
        }, 2000);
    } else {
        error({
            url     : url,
            status  : '500',
            message : 'Lo hay datos registrado.....'
        });
    }   
}

function getDataGastosFromPromise(url, response, error)
{
    const promiseObjet = new Promise(function(resolve, reject)
    {
        if(mockData.gastos.length > 0){
            setTimeout(function(){
                resolve({
                    url     : url,
                    status  : '200',
                    data    : mockData.gastos,
                    message : 'Los Datos se obtuvieron Exitosamente'
                })
            }, 2000);
        } else {
            reject({
                url     : url,
                status  : '500',
                message : 'Lo hay datos registrado.....'
            });
        }
    });
    return promiseObjet;
}