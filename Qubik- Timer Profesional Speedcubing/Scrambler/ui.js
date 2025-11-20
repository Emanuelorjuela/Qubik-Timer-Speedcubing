import { generador, scrambler, estadoCero } from "./scrambler.js";
import { cubo } from "./cubo.js";


const notacion = document.querySelector(".notacion");
notacion.readOnly = true;

export const menuScramble = document.querySelectorAll(".btn2");

export function eventosScramble() {
  
  menuScramble[0].addEventListener("click", () => {
    estadoCero(cubo)
    notacion.value = " ";
    scrambler(cubo,generador())

  });

  menuScramble[1].addEventListener("change", () => {
    notacion.readOnly = !menuScramble[1].checked;
    if (menuScramble[1].checked) notacion.select();
  });

  menuScramble[2].addEventListener("click", () => {
    navigator.clipboard.writeText(notacion.value);
  });
}
