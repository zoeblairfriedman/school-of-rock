const showAndTellContainer = document.getElementById("showAndTellContainer")

class Show {

     constructor(show){
         this.name = show.name
         this.id = show.id
         this.rockId = show.rockId 
     }

     static appendShowForm(rock, ul){
        const showForm = `
            <form id="showForm">
                <label>What did ${rock.name} bring today? </label>
                <input id="showContent"/>
                <input type="hidden" id= ${rock.id}>
                <input type="submit"></input>
            </form>
            `
        let div = document.createElement("div")
        div.innerHTML = showForm
        showAndTellContainer.append(div)
        document.getElementById('showForm').addEventListener('submit', Show.addShow)
    }


    static appendShows(){
        for (let rock of Rock.allRocks){
            //this should be instance method
            Show.appendShowsForRock(rock)
        }
    }

    static appendShowsForRock(rock){
        const intro = document.createElement("p")
        intro.innerHTML = `${rock.name} brought:`
        intro.className = "show-and-tell-intro"
        intro.addEventListener('click', () => rock.editShows())
        const ul = document.createElement("ul")
        ul.id = `rock-${rock.id}`
            if (rock.shows.length !== 0)
            for (let show of rock.shows){
                show.appendShow(ul, show)
            } else {
                const li = document.createElement("li")
                li.innerHTML = "nothing :("
                ul.appendChild(li)
            }
    
        showAndTellContainer.append(intro, ul)
    }

    appendShow(ul){
        const li = document.createElement("li")
        li.innerHTML = this.name
        li.id = this.id
        ul.appendChild(li)
    }

    destroyShow(li){
        fetch(`http://localhost:3000/shows/${this.id}`, {
            method: "DELETE"
        }).then(r => r.json()).then(() => this.takeHome())
    }
    
    takeHome(){
        // HOW TO GET THIS TO UPDATE IN THE DOM --> GO THROUGH ROCK'S SHOWS AND DELETE THIS SHOW
        showAndTellContainer.innerHTML = ""
        Show.appendShows()
    }

    static addShow(e){ 
        e.preventDefault()
        const showName = e.target.children[1].value
        const rockId = e.target.children[2].id

        const body = {
            show: {
            name: showName,
            rock_id: rockId
        }}

        fetch(`http://localhost:3000/shows`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        },
        body: JSON.stringify(body)
        })
        .then(jsonToJS)
        .then(show => {
            let newShow = new Show(show)
            newShow.rockId = show.rock_id
            let ul = document.getElementById(`show-list`)
            const thisRock = Rock.allRocks.find(r => r.id === show.rock_id)
            thisRock.shows.push(newShow)
            showAndTellContainer.innerHTML = ""
            Show.appendShows()
        })
    }



    }



// COULD NOT GET THESE INTO THE CLASSES



