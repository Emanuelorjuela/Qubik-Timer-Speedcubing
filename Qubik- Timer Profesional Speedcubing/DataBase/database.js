
export let db;

import { leer, añadirProm } from "./crud.js"
import { dataDiv } from "./uiDB.js"
import { checkDBProm, crearPromedios, arrayDB, Mo3, funcGeneral } from "./promedios.js"
import { archivador } from "./uiDB.js"

const contenedor= document.querySelector(".contenedor")

let arrayDBTime=[];

export const request= indexedDB.open("registros", 2);

request.onupgradeneeded = function(e) {
    db = e.target.result;

    if (!db.objectStoreNames.contains("cube3x3")) {
        db.createObjectStore("cube3x3", { keyPath: "id", autoIncrement: true });
    }

    if (!db.objectStoreNames.contains("promDB")) {
        db.createObjectStore("promDB", { keyPath: "id", autoIncrement: true });
    }
};


request.onsuccess = function(e) {
    db = e.target.result;
    console.log("Base de datos abierta con éxito");

    leer((array) => {
        array.forEach((item, idx) => {
            dataDiv(idx + 1, item.time,item.dnf,item.masDos);
        });    
    });


    const tx = db.transaction("promDB", "readonly");
    const store = tx.objectStore("promDB");
    const req = store.getAll();

    req.onsuccess = () => {
        const datos = req.result;

        if (datos.length === 0) {
            
            for(let i=0;i<6;i++){
                añadirProm({actual: true})
            }

            checkDBProm((datos) => {
    crearPromedios(datos);
});
        }else{
            checkDBProm((datos) => {
    crearPromedios(datos);
});

        } 
    };

    
    funcGeneral()
};


request.onerror = function(e) {
    console.error("Error al abrir la base de datos", e.target.error);
};



