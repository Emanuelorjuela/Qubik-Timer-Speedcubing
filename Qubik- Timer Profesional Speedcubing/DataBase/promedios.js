
import { db } from "./database.js"

const promedios= document.querySelector(".promedios")

export const checkDBProm = (cb) => {
    const transaccion = db.transaction("promDB", "readonly");
    const store = transaccion.objectStore("promDB");

    const request = store.openCursor();
    let datosProm = [];

    request.onsuccess = (e) => {
        const cursor = e.target.result;

        if (cursor) {
            const obj = cursor.value;

            datosProm.push(obj);

            cursor.continue();
        } else {
            
            cb(datosProm);
        }
    };

    request.onerror = (e) => {
        console.error("Error:", e.target.error);
    };
};



export const crearPromedios=(dato)=>{
    

    const dates = document.createElement("div");
    dates.classList.add("dates");

    const h2Single = document.createElement("h2");
    h2Single.textContent = "Single: 3.27";

    const h2Media = document.createElement("h2");
    h2Media.textContent = "Media: 15.68";

    dates.appendChild(h2Single);
    dates.appendChild(h2Media);


    const boxPromedios = document.createElement("div");
    boxPromedios.classList.add("box_promedios");

    let medias= ["Mo3","Ao5","Ao12","Ao25","Ao50","Ao100"]
    let index=0;
    for(let i of medias){
        let idx=index
        let prom1 = document.createElement("div");
    prom1.classList.add("promedios_ao5");
    let sel1 = document.createElement("select");
    sel1.classList.add("select_promedio")
    
    let opt1a = document.createElement("option");
    opt1a.value = "Actual";
    opt1a.textContent = `${i} Actual` ;
    
    let opt1b = document.createElement("option");
    opt1b.value = "Best";
    opt1b.textContent = `${i} Best`;
    sel1.appendChild(opt1a);
    sel1.appendChild(opt1b);
    
    let p1 = document.createElement("p");
    p1.classList.add("time_promedio");
    prom1.appendChild(sel1);
    prom1.appendChild(p1);
    boxPromedios.appendChild(prom1);

    if (dato) {
    if (dato[idx].actual === true) {
        sel1.value = "Actual";
    } else {
        sel1.value = "Best";
    }
}

sel1.addEventListener("change", () => {

    if (sel1.value === "Actual") {
        dato[idx].actual = true;
    } else {
        dato[idx].actual = false;
    }

    const tx = db.transaction("promDB", "readwrite");
    const store = tx.objectStore("promDB");
    store.put(dato[idx]);    

});

    index++
   
    }

    promedios.appendChild(dates);
    promedios.appendChild(boxPromedios);

}


export const arrayDB = () => {
    return new Promise((resolve, reject) => {

        const transaccion = db.transaction("cube3x3", "readonly");
        const store = transaccion.objectStore("cube3x3");

        const request = store.openCursor();
        const array = [];

        request.onsuccess = (e) => {
            const cursor = e.target.result;

            if (cursor) {
                const obj = cursor.value;

                if (obj.masDos) array.push(obj.timeMasDos);
                else if (obj.dnf) array.push(obj.timeDNF);
                else array.push(obj.time);

                cursor.continue();
            } else {
                resolve(array.reverse()); 
            }
        };

        request.onerror = (e) => reject(e.target.error);
    });
};

export async function Mo3(){
    let resultado;
    let operacion;
    let db= await arrayDB();
    let promedio=[db[0],db[1],db[2]]
    console.log(promedio)
    if(promedio.includes("DNF")){
       resultado= "DNF"
    }else{
        operacion= (Number(promedio[0])+Number(promedio[1])+Number(promedio[2]))/3;
        resultado= operacion.toFixed(2)
    }
    console.log(resultado)
} 

export async function funcGeneral(){
    let db= await arrayDB();
    

    function ao5(){
        let promedio=[];
        let resultado;

        if(db.length<5){
            resultado="--"
            console.log(resultado)
        }else{
            for(let i=0;i<5;i++){
            promedio.push(db[i])
        }
        let dnf= promedio.filter(x=>x==="DNF").length
        promedio.sort((a, b) => a - b);

        if(dnf>=2){
            resultado= "DNF"
            console.log(resultado)
        }
        else if(dnf==1){

            promedio= promedio.filter(x => x !== "DNF");
            promedio.splice(0,1)

        }else if(dnf==0){
            promedio.splice(0,1)
            promedio.splice(3,1)
            
        }

        if(resultado!="DNF"){
            console.log(promedio)
            let operacion=0;

            for(let i=0;i<promedio.length;i++){
                let suma= Number(promedio[i])
                operacion= operacion+suma
            }

            
            let media= operacion/3
            resultado= media.toFixed(2)
            console.log(resultado)
        }
        }

        

    }

    return ao5()
}

