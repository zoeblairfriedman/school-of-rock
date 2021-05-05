function fetchRocks(){
    fetch("http://localhost:3000/rocks")
    .then(r => r.json())
    .then(appendRocks)
}

function appendRocks(rocks){
    const div = document.getElementById("rockContainer")
    for (let rock of rocks){
        let rockDiv = document.createElement("div")
        rockDiv.className = "rock-div"
        div.append(rockDiv)
        let rockBod = document.createElement("img")
        rockBod.src = `body/${rock.body}.png`
        rockBod.className = "rock-body"
        let rockEyes = document.createElement("img")
        rockEyes.src = `eyes/${rock.eyes}.png`
        rockEyes.className = "eyes"
        let rockMouth = document.createElement("img")
        rockMouth.src = `mouth/${rock.mouth}.png`
        rockMouth.className = "mouth"
        let rockName = document.createElement("h1")
        rockName.innerText = `${rock.name}`
        rockName.className = "name"
        rockDiv.append(rockBod, rockEyes, rockMouth, rockName)
        appendShows(rock, rockDiv)
    }
}

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

function postRock(e){
    e.preventDefault()
    let name = e.target.children[1].value
    // let body = e.target.children[5].children.body.value
    debugger
}