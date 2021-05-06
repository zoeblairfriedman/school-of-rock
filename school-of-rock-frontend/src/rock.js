class Rock {

    static allRocks = []

    constructor({name, id, body, eyes, mouth, shows}){
        this.name = name
        this.id = id
        this.body = body
        this.eyes = eyes
        this.mouth = mouth
        this.shows = shows.map(show => new Show(show))
        Rock.allRocks.push(this)
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
        // this.appendShows()
    }

    static fetchRocks(){
        return fetch("http://localhost:3000/rocks")
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
            Show.appendShowsForRock(newRock)
        })
    
        e.target.reset()
        toggleForm()
    }

    editShows(){
        showAndTellContainer.innerHTML = ""
        Show.appendShowsForRock(this)
        const liCollection = document.querySelectorAll("li")
        const ul = document.querySelector("ul")
        ul.id = "show-list"
        for (let li of liCollection){
            if (!!li.id){
             const btn = document.createElement("button")
             btn.innerText = "take home" 
             const show = this.shows.find(s => s.id == li.id)
             btn.addEventListener("click", () => show.destroyShow())
             li.append(btn)
         }
        }
        Show.appendShowForm(this, ul)
     }

}

// DESTROY ROCKS <--should these live in the class? 

function destroyRock(id, rockDiv){
    debugger
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

