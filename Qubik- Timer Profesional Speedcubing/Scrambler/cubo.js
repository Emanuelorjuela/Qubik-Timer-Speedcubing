
export const cubo= document.querySelector(".cubo")
export const btns= document.querySelector(".btns")

export const colors=["white","blue","green","yellow",
    "red","orange"]



export function crearCaras(div){
    for(let color of colors){
        let cara= document.createElement("DIV")
        cara.classList.add("cara")

        for(let i=0;i<9;i++){
            let ficha= document.createElement("DIV")
            ficha.classList.add(`${color}`)
            cara.appendChild(ficha)
        }
        div.appendChild(cara)
    }
}

crearCaras(cubo)

