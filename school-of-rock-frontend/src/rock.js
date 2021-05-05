class Rock {

    constructor(rock){
        this.name = rock.name
        this.id = rock.id
        this.body = rock.body
        this.eyes = rock.eyes
        this.mouth = rock.mouth
        this.shows = rock.shows
    }

    appendRock(){
        const div = document.getElementById("rockContainer")
        const rockDiv = document.createElement("div")
        rockDiv.className = "rock-div"
        div.append(rockDiv)
        const rockBod = document.createElement("img")
        rockBod.src = `body/${this.body}.png`
        rockBod.className = "rock-body"
        const rockEyes = document.createElement("img")
        rockEyes.src = `eyes/${this.eyes}.png`
        rockEyes.className = "eyes"
        const rockMouth = document.createElement("img")
        rockMouth.src = `mouth/${this.mouth}.png`
        rockMouth.className = "mouth"
        const rockName = document.createElement("h1")
        rockName.innerText = `${this.name}`
        rockName.className = "name"
        const deleteRock = document.createElement("button")
        deleteRock.innerText = "delete"
        deleteRock.className = "delete"
        deleteRock.addEventListener("click", () => destroyRock(this.id, rockDiv))
        rockDiv.append(rockBod, rockEyes, rockMouth, rockName, deleteRock)
        appendShows(this)
    }

    static fetchRocks(){
        fetch("http://localhost:3000/rocks")
        .then(jsonToJS)
        .then(this.appendRocks)
    }
    
    static appendRocks(rocks){
        for (let rock of rocks){
            let newRock = new Rock(rock)
            newRock.appendRock()
        }
    }

    static postRock(e){
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
        .then(rock => {
            let newRock = new Rock(rock)
            newRock.appendRock()
        })
    
        e.target.reset()
        toggleForm()
    }

}

// DESTROY ROCKS <--should these live in the class? 

function destroyRock(id, rockDiv){
    fetch(`http://localhost:3000/rocks/${id}`, {
        method: "DELETE"
    }).then(jsonToJS).then(message => graduate(message, rockDiv))
}

function graduate(m, div){
    div.remove()
    window.alert(m.message)
    // how can i remove the associated todos from the dom?
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

