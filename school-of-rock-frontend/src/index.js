const useAPI = new API()

let addRock = false;
const rockForm = document.getElementById("rockForm")
document.addEventListener("DOMContentLoaded", function(){
    rockForm.style.display = "none"
})

const addBtn = document.getElementById("new-rock-btn");
addBtn.addEventListener("click", toggleForm)
rockForm.addEventListener('submit', Rock.postRock)

function jsonToJS(r){
    return r.json()
}

Rock.fetchRocks().then(Show.appendShows)
let flash = setInterval(flashLogo, 1000)

const logo = document.getElementById("logo")
function flashLogo(){
    const url = "file:///Users/ZBF/Development/code/phaseFour/school-of-rock/school-of-rock-frontend/"
    logo.src === `${url}app-logo.png` ? logo.src = `${url}app-logo-literal.png` : logo.src = `${url}app-logo.png`
}

logo.addEventListener("click", () => clearTimeout(flash))

