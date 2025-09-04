let btn;

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!response.ok) {
            throw new Error("Could Not Fetch Resource")
        }

        const data = await response.json()
        console.log(data)
        const pokemonSprite = data.sprites.front_default
        const imgElement = document.getElementById("pokemonSprite")

        imgElement.src = pokemonSprite
        imgElement.style.display = "block"
    }
    catch (error) {
        console.error(error)
    }
}

const getData = async () => {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!response.ok) {
            throw new Error("Could Not Fetch Resource")
        }

        const data = await response.json()
        console.log(data)
        const pokemonSprite = data.sprites.front_default
        const imgElement = document.getElementById("pokemonSprite")

        imgElement.src = pokemonSprite
        imgElement.style.display = "block"
    }
    catch (error) {
        console.error(error)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    btn = document.getElementById("btn")
    btn.addEventListener('click', getData)
})


// window.addEventListener("DOMContentLoaded", (e) => {
//     // fetchData()
//     // console.log({target: e.target})

//     console.log("BSDK HRITHIK RAJ");

// })
