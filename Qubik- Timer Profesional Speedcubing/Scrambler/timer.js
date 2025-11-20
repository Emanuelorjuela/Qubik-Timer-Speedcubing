import {notacion} from "./scrambler.js"
import {menuScramble} from "./ui.js"
import { añadir } from "../DataBase/crud.js";
import { arrayInfo } from "../DataBase/solves.js";

export const cronometro = document.querySelector(".time");

let inicio = null;

export function actualizar() {
  const ahora = new Date();
  const tiempoTranscurrido = ahora - inicio;

  let horas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
  let minutos = Math.floor((tiempoTranscurrido / (1000 * 60)) % 60);
  let segundos = (tiempoTranscurrido / 1000) % 60;

  let texto = "";

  if (horas > 0) {
    let segundosTexto = segundos.toFixed(2);
    if (minutos < 10) {
      texto = horas + ":0" + minutos + ":" + segundosTexto.padStart(5, "0");
    } else {
      texto = horas + ":" + minutos + ":" + segundosTexto.padStart(5, "0");
    }
  } else if (minutos > 0) {
    let segundosTexto = segundos.toFixed(2);
    if (segundos < 10) {
      texto = minutos + ":0" + segundosTexto;
    } else {
      texto = minutos + ":" + segundosTexto;
    }
  } else {
    texto = segundos.toFixed(2);
  }

  cronometro.textContent = texto;
}

export function eventosTimer() {
  let intervalo = null;
  let presionInicio = null;
  let presionado = false;
  let corriendo = false;

  document.addEventListener("keydown", (e) => {
    if(menuScramble[1].checked) return;

    if (e.code === "Space" && !presionado) {
      e.preventDefault();
      presionado = true;
      presionInicio = Date.now();

      if (!corriendo) {
        cronometro.style.color = "red";

        setTimeout(() => {
          if (presionado && !corriendo) {
            cronometro.style.color = "green";
          }
        }, 300);
      }
    }

    if (e.code === "Escape" && corriendo) {
      clearInterval(intervalo);
      intervalo = null;
      corriendo = false;
      cronometro.textContent = "0.00";
      cronometro.style.color = "black";
    }
  });

  document.addEventListener("keyup", (e) => {
    if(menuScramble[1].checked) return;

    if (e.code === "Space") {
      e.preventDefault();
      let duracion = Date.now() - presionInicio;

      if (!corriendo && duracion >= 300) {
        inicio = new Date();
        intervalo = setInterval(actualizar, 10);
        corriendo = true;
        cronometro.style.color = "black";
      } else if (corriendo) {
        clearInterval(intervalo);
        intervalo = null;
        corriendo = false;

        añadir(arrayInfo())

        cronometro.style.color = "black";
        menuScramble[0].click()
      } else {
        cronometro.style.color = "black";
      }

      presionado = false;
    }
  });
}





