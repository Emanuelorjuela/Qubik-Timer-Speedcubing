import{ notacion } from "../Scrambler/scrambler.js"
import{ cronometro } from "../Scrambler/timer.js"

export const arrayInfo=()=>{
	  let solve = {
	time: cronometro.textContent,
	scramble: notacion.value,
	date: new Date().toLocaleString('en-US', { 
		month: 'long', 
		day: '2-digit', 
		year: 'numeric', 
		hour: 'numeric', 
		minute: '2-digit', 
		hour12: true 
	}),

	dnf: false,
	masDos: false,
	timeMasDos: Number(cronometro.textContent)+2,
	timeDNF: "DNF",
	typeCube:"3x3"
};


	return solve
}

