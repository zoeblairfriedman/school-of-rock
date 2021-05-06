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

    

    appendShow(ul){
        const li = document.createElement("li")
        li.innerHTML = this.name
        li.id = this.id
        ul.appendChild(li)
    }

    destroyShow(li){
        fetch(`http://localhost:3000/shows/${this.id}`, {
            method: "DELETE"
        }).then(r => r.json()).then(() => this.takeHome(li))
    }
    
    takeHome(li){
        li.remove()
        // redirect?
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
            // redirect instead???
            newShow.appendShow(ul)
        })
    
        e.target.reset()
        // toggleForm()
    }



    }



// COULD NOT GET THESE INTO THE CLASSES



