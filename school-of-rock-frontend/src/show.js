const showAndTellContainer = document.getElementById("showAndTellContainer")

class Show {
     constructor(show){
         this.name = show.name
         this.id = show.id
         this.rockId = show.rockId 
     }

     static appendShowForm(rock){
        const showForm = `
            <form id="showForm">
                <label>What did ${rock.name} bring today? </label>
                <input id="showContent"/>
                <input type="hidden" id= ${rock.id}>
                <input type="submit"></input>
            </form>
            `
        showAndTellContainer.innerHTML += showForm
        document.getElementById('showForm').addEventListener('submit', Show.addShow)
    }

    static appendShows(rock){
        const intro = document.createElement("p")
        intro.innerHTML = `${rock.name} brought:`
        intro.addEventListener('click', () => editShows(rock))
        const ul = document.createElement("ul")
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
        // debugger
        fetch(`http://localhost:3000/shows/${this.id}`, {
            method: "DELETE"
        }).then(r => r.json()).then(() => takeHome(li))
    }
    
    takeHome(li){
        li.remove()
    }

    static addShow(e){ 
        e.preventDefault()
        const showName = e.target.children[1].value
        const rockId = e.target.children[2].id

        const body = {
            show: {
            name: showName,
            rockId: rockId
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
            //need ul to append ^^ and single source of truth problem
            newShow.appendShow()
        })
    
        e.target.reset()
        // toggleForm()
    }

    }



// COULD NOT GET THESE INTO THE CLASSES

function editShows(rock){
   showAndTellContainer.innerHTML = ""
   Show.appendShows(rock)
   const liCollection = document.querySelectorAll("li")
   for (let li of liCollection){
       if (!!li.id){
        const btn = document.createElement("button")
        btn.innerText = "take home" 
        //this is broken, why?
        btn.addEventListener("click", () => destroyShow(li))
        li.append(btn)
    }
   }
   Show.appendShowForm(rock)
}

