Rock.fetchRocks()


let addRock = false;

const rockForm = document.getElementById("rockForm")

document.addEventListener("DOMContentLoaded", function(){
    rockForm.style.display = "none"
})

const addBtn = document.getElementById("new-rock-btn");
addBtn.addEventListener("click", toggleForm)

rockForm.addEventListener('submit', postRock)


