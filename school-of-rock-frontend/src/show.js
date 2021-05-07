const showAndTellContainer = document.getElementById("showAndTellContainer")

class Show {

    // static allShows = []

     constructor(show){
         this.name = show.name
         this.id = show.id
         this.rockId = show.rockId
        //  Show.allShows.push(this) 
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
            rock.appendShowsForRock()
        }
    }

    appendShow(ul){
        const li = document.createElement("li")
        li.innerHTML = this.name
        li.id = this.id
        ul.appendChild(li)
    }

    destroyShow(){
        fetch(`http://localhost:3000/shows/${this.id}`, {
            method: "DELETE"
        })
        .then(() => {
        //  Rock.allRocks.find(r => r.id === this.rockId) <--- why can't i set this to a variable?
        // or even this??? Rock.allRocks.find(r => r.id === this.rockId).shows
        this.takeHome()
        //   document.getElementById(this.id).remove()
        // make sure it takes the shows as well
        })
    }

    // JINOOK'S VERSION
    // destroyShow(){
    //     fetch(`http://localhost:3000/shows/${this.id}`, {
    //         method: "DELETE"
    //     })
    //     .then(() => {
    //       document.getElementById(this.id).remove()
    //       this.takeHome()
    //       // update the rock's shows array in Rock.allRocks
    //       Rock.allRocks.find(rock => rock.id == this.rockId).shows = Rock.allRocks.find(rock => rock.id == this.rockId).shows.filter(show => show.id !== this.id)
    //       document.getElementById(this.id).remove()
    //     })
    // }



    
    takeHome(){
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

