

class Rock {

    // constructor(rock){
    //     this.name = rock.name
    //     this.id = rock.id
    //     this.body = rock.body
    //     this.eyes = rock.eyes
    //     this.mouth = rock.eyes
    //     this.shows = rock.shows
    // }

}

// READ ROCKS

function fetchRocks(){
    fetch("http://localhost:3000/rocks")
    .then(jsonToJS)
    .then(appendRocks)
}

function appendRocks(rocks){
    for (let rock of rocks){
        appendRock(rock)
    }
}

function appendRock(rock){
    const div = document.getElementById("rockContainer")
    const rockDiv = document.createElement("div")
    rockDiv.className = "rock-div"
    div.append(rockDiv)
    const rockBod = document.createElement("img")
    rockBod.src = `body/${rock.body}.png`
    rockBod.className = "rock-body"
    const rockEyes = document.createElement("img")
    rockEyes.src = `eyes/${rock.eyes}.png`
    rockEyes.className = "eyes"
    const rockMouth = document.createElement("img")
    rockMouth.src = `mouth/${rock.mouth}.png`
    rockMouth.className = "mouth"
    const rockName = document.createElement("h1")
    rockName.innerText = `${rock.name}`
    rockName.className = "name"
    const deleteRock = document.createElement("button")
    deleteRock.innerText = "delete"
    deleteRock.className = "delete"
    deleteRock.addEventListener("click", () => destroyRock(rock.id, rockDiv))
    rockDiv.append(rockBod, rockEyes, rockMouth, rockName, deleteRock)
    appendShows(rock)
}

// CREATE ROCKS

function postRock(e){
    e.preventDefault()
    let rockName = e.target.children[1].value
    let rockParts = document.querySelectorAll(".radio")
    let rockBody = "tbd"
    let rockEyes = "tbd"
    let rockMouth = "tbd"

    for (let i = 0; i < rockParts.length; i++){
        if (rockParts[i].checked){
            if (rockParts[i].name === "body"){
                rockBody = rockParts[i].value
            } else if (rockParts[i].name === "eyes"){
                rockEyes = rockParts[i].value
            } else {  
                rockMouth = rockParts[i].value
            }
        }
    }
        const body = {
        rock: {
        name: rockName,
        body: rockBody,
        eyes: rockEyes,
        mouth: rockMouth
    }}

    fetch("http://localhost:3000/rocks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    },
    body: JSON.stringify(body)
    })
    .then(jsonToJS)
    .then(appendRock)

    e.target.reset()
    toggleForm()
}

// DESTROY ROCKS

function destroyRock(id, rockDiv){
    fetch(`http://localhost:3000/rocks/${id}`, {
        method: "DELETE"
    }).then(jsonToJS).then(message => graduate(message, rockDiv))
}

function graduate(m, div){
    div.remove()
    window.alert(m.message)
}


// OTHER 

function toggleForm(){
    if (!!addRock){
        addBtn.innerText = "Create Rock"
        rockForm.style.display = "none"
        addRock = false
    } else {
        addBtn.innerText = "Hide Form"
        rockForm.style.display = "block"
        addRock = true
    }
}

function renderShowAndTell(rock){
   
}