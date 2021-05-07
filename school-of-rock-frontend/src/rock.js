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
        deleteRock.addEventListener("click", () => this.destroyRock(this.id, rockDiv))
        rockDiv.append(rockBod, rockEyes, rockMouth, rockName, deleteRock)
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
            newRock.appendShowsForRock()
        })
    
        e.target.reset()
        toggleForm()
    }

    editShows(){
        showAndTellContainer.innerHTML = ""
        this.appendShowsForRock()
        const liCollection = document.querySelectorAll("li")
        const ul = document.querySelector("ul")
        ul.id = "show-list"
        for (let li of liCollection){
            if (!!li.id){
             const btn = document.createElement("button")
             btn.innerText = "take home"
             btn.className = "btn btn-primary btn-sm" 
             const show = this.shows.find(s => s.id == li.id)
             btn.addEventListener("click", () => show.destroyShow())
             li.className = "button-font"
             li.append(btn)
         }
        }
        Show.appendShowForm(this, ul)
     }

     appendShowsForRock(){
        const div = document.createElement("div")
        div.id = `rock-${this.id}-div`
        const intro = document.createElement("p")
        intro.innerHTML = `${this.name} brought:`
        intro.className = `show-and-tell-intro`
        intro.addEventListener('click', () => this.editShows())
        const ul = document.createElement("ul")
        ul.id = `rock-${this.id}`
            if (this.shows.length !== 0)
            for (let show of this.shows){
                show.appendShow(ul)
            } else {
                const li = document.createElement("li")
                li.innerHTML = "nothing :("
                ul.appendChild(li)
            }
    
        showAndTellContainer.append(div)
        div.append(intro, ul)
    }


    destroyRock(id, rockDiv){
        fetch(`http://localhost:3000/rocks/${id}`, {
            method: "DELETE"
        }).then(jsonToJS).then(message => this.graduate(message, rockDiv))
        Rock.allRocks = Rock.allRocks.filter(r => r !== Rock.allRocks.find(rock => rock.id == this.id)) 
        document.getElementById(`rock-${this.id}-div`).remove()
    }
    
    graduate(m, div){
        div.remove()
        window.alert(m.message)
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

