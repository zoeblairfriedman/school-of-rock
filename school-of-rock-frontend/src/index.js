const useAPI = new API()

const rockForm = document.getElementById("rockForm")
rockForm.addEventListener('submit', Rock.postRock)



function jsonToJS(r){
    return r.json()
}

Rock.fetchRocks().then(Show.appendShows)

let flash = setInterval(flashLogo, 1000)

const logo = document.getElementById("logo")
function flashLogo(){
    const url = "file:///Users/ZBF/Development/code/phaseFour/school-of-rock/school-of-rock-frontend/"
    logo.src === `${url}logo-pink.png` ? logo.src = `${url}logo-pink-literal.png` : logo.src = `${url}logo-pink.png`
}

logo.addEventListener("click", () => clearTimeout(flash))



