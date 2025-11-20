import { cubo } from "./cubo.js";
import { scrambler, generador,estadoCero,notacion } from "./scrambler.js";
import{white,yellow,green,blue,orange,red} from "./scrambler.js"
import{actualizar,cronometro,eventosTimer} from "./timer.js"
import{eventosScramble, menuScramble} from "./ui.js"

 notacion.addEventListener("input",()=>{
      let value= notacion.value
      let array=value.split(" ")
      estadoCero(cubo)
      scrambler(cubo,array)
 })


 

window.addEventListener("DOMContentLoaded", () => {
  eventosTimer()
  eventosScramble()
});
