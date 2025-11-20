
import { db } from "./database.js"
import { dataDiv, archivador } from "./uiDB.js"

export const añadirProm=(obj)=>{
    let transaccion= db.transaction("promDB","readwrite")
    let confirmar= transaccion.objectStore("promDB")
    
    let request= confirmar.add(obj)
}

export const añadir=(obj)=>{

    let transaccion= db.transaction("cube3x3","readwrite")
    let confirmar= transaccion.objectStore("cube3x3")
    
    let request= confirmar.add(obj)

    request.onsuccess=(e)=>{
        let datas= document.querySelectorAll(".data")
        let idx= datas.length+1
        dataDiv(idx, obj.time)
        console.log(datas)
    }
    
    request.onerror=(e)=>{
        console.error("error: ", e.target.error)
    }

    
    transaccion.oncomplete=()=>{
        console.log("se agrego el obj")
    }

    transaccion.onerror=(e)=>{
        console.log("Error: ",e.target.error)
    }
}



export const leer = (cb) => {
    let transaccion = db.transaction("cube3x3", "readonly");
    let objectStore = transaccion.objectStore("cube3x3");

    let request = objectStore.openCursor();
    let arrayDB=[];

    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            arrayDB.push(cursor.value) 
            cursor.continue();
        } else {
            console.log("Se leyeron todos los registros");
            if(cb) cb(arrayDB)
        }

       
    };

    request.onerror = (e) => {
        console.error("Error al leer registros:", e.target.error);
    };

    return arrayDB
};




export const eliminar = (index,div) => {
    let transaccion = db.transaction("cube3x3", "readwrite");
    let store = transaccion.objectStore("cube3x3");

    let request = store.openCursor();
    let contador = 0;

    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            if (contador === index) {
                let id = cursor.value.id;  
                store.delete(id);

                if(div=="database"){
                	leer((array) => {
                    archivador.innerHTML = "";
                    array.reverse().forEach((item, idx) => {
                        dataDiv(idx + 1, item.time);
                    });
                });
                }
                else if(div=="card"){
                	leer((array) => {
                    archivador.innerHTML = "";
                    array.forEach((item, idx) => {
                        dataDiv(idx + 1, item.time);
                    });
                });
                }

                return;
            }
            contador++;
            cursor.continue();
        }
    };

    request.onerror = (e) => {
        console.error("Error al eliminar por índice:", e.target.error);
    };
};

