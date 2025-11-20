import {movesRL,movesUD,movesFB,rotacion} from "./rotaciones.js"
import { cubo, colors } from "./cubo.js "


export let white, yellow, green, blue, red, orange;

export const notacion= document.querySelector(".notacion")
notacion.readOnly = true;

export const moves=[
  "R","R'","R2","L","L'","L2","U","U'","U2","D","D'","D2",
  "F","F'","F2","B","B'","B2"]

export const generador =()=>{

    let arraySc = [];
  for (let i = 0; i < 25; i++) {
    let move;

    while (true) {
 
      let num = Math.floor(Math.random() * moves.length);
      move = moves[num];

      if (i >= 1 && move[0] === arraySc[i-1][0]) {
        continue; 
      }
      
      if (i >= 2 && move[0] === arraySc[i-2][0] && move[0] !== arraySc[i-1][0]) {
        continue;
      }

      break;
    }

    arraySc.push(move);
    
  }

  notacion.value= arraySc.join(" ")
  return arraySc

}

export const scrambler=(cube,comb)=>{
      const white= cube.querySelectorAll(".white")
      const blue= cube.querySelectorAll(".blue")
      const green= cube.querySelectorAll(".green")
      const yellow= cube.querySelectorAll(".yellow")
      const orange=cube.querySelectorAll(".orange")
      const red= cube.querySelectorAll(".red")

 const faces= {white,yellow,green,blue,orange,red};

  for (let move of comb) {
    const base = move[0]; 
    const type = move.slice(1); 

    const map = {
        R: movesRL, L: movesRL, U: movesUD,
        D: movesUD, F: movesFB, B: movesFB
    };

    const func = map[base];
    if (!func) continue;

    if (type === "2") {
        func(base,faces);
        func(base,faces);
    } else if (type === "'") {
        func(base + "'",faces); 
    } else {
        func(base,faces);
    }
}
}

scrambler(cubo,generador())

export const estadoCero = (cube) => {
  const caras = cube.querySelectorAll(".cara");
  

  caras.forEach((cara, i) => {
    const fichas = cara.querySelectorAll("div");
    fichas.forEach((ficha) => {
      ficha.className = ""; // quitar todas las clases
      ficha.classList.add(colors[i]); // asignar color correspondiente
    });
  });
};
