import{ db } from "./database.js"

export const marcarDNF = (index, elementoTime) => {
    let transaccion = db.transaction("cube3x3", "readwrite");
    let store = transaccion.objectStore("cube3x3");

    let request = store.openCursor();
    let contador = 0;

    request.onsuccess = (e) => {
        let cursor = e.target.result;

        if (cursor) {
            if (contador === index) {
                let registro = cursor.value;

               
                if (registro.dnf === false) {
                    registro.dnf = true;
                    registro.masDos = false; 
                    elementoTime.textContent = registro.timeDNF;
                    elementoTime.style.color = "red";

                    
                    const dataDiv = elementoTime.closest(".data");
                    dataDiv.querySelector(".dnf").style.color = "red";
                    dataDiv.querySelector(".masdos").style.color = "#777";
                } else {
                    registro.dnf = false;

                    
                    if (registro.masDos === false) {
                        elementoTime.textContent = Number(registro.time).toFixed(2);
                        elementoTime.style.color = "green";
                    } else {
                        elementoTime.textContent = Number(registro.timeMasDos).toFixed(2);
                        elementoTime.style.color = "orange";
                    }

                    const dataDiv = elementoTime.closest(".data");
                    dataDiv.querySelector(".dnf").style.color = "#777";
                }

                cursor.update(registro);
                return;
            }

            contador++;
            cursor.continue();
        }
    };
};


export const marcarDos = (index, elementoTime) => {
    let transaccion = db.transaction("cube3x3", "readwrite");
    let store = transaccion.objectStore("cube3x3");

    let request = store.openCursor();
    let contador = 0;

    request.onsuccess = (e) => {
        let cursor = e.target.result;

        if (cursor) {
            if (contador === index) {
                let registro = cursor.value;


                if (registro.masDos === false) {
                    registro.masDos = true;
                    registro.dnf = false; 
                    elementoTime.textContent = Number(registro.timeMasDos).toFixed(2);
                    elementoTime.style.color = "orange";

                    const dataDiv = elementoTime.closest(".data");
                    dataDiv.querySelector(".masdos").style.color = "orange";
                    dataDiv.querySelector(".dnf").style.color = "#777";
                } else {
                    registro.masDos = false;


                    if (registro.dnf === true) {
                        elementoTime.textContent = registro.timeDNF;
                        elementoTime.style.color = "red";
                    } else {
                        elementoTime.textContent = Number(registro.time).toFixed(2);
                        elementoTime.style.color = "green";
                    }

                    const dataDiv = elementoTime.closest(".data");
                    dataDiv.querySelector(".masdos").style.color = "#777";
                }

                cursor.update(registro);
                return;
            }

            contador++;
            cursor.continue();
        }
    };
};
