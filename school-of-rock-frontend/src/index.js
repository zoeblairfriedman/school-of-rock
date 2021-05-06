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
