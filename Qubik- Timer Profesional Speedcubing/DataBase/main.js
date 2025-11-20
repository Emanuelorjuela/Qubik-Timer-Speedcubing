import { db, request } from "./db.js";
import { leer } from "./crud.js";
import { dataDiv } from "./ui.js";


window.onDBReady = (db) => {
    leer((array) => {
        array.forEach((item, idx) => {
            dataDiv(idx + 1, item.time, item.dnf, item.masDos);
        });
    });
};
