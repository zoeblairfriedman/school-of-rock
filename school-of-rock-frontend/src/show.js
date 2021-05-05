const showAndTellContainer = document.getElementById("showAndTellContainer")

function appendShows(rock){
    const intro = document.createElement("p")
    intro.innerHTML = `${rock.name} brought:`
    intro.addEventListener('click', () => editShows(rock))
    const ul = document.createElement("ul")
    if (rock.shows.length !== 0)
        for (let show of rock.shows){
            const li = document.createElement("li")
            li.innerHTML = show.name
            li.id = show.id
            ul.appendChild(li)
        } else {
            const li = document.createElement("li")
            li.innerHTML = "nothing :("
            ul.appendChild(li)
        }
  
    showAndTellContainer.append(intro, ul)
}

function editShows(rock){
   showAndTellContainer.innerHTML = ""
   appendShows(rock)
   const liCollection = document.querySelectorAll("li")
   for (let li of liCollection){
       const btn = document.createElement("button")
       btn.innerText = "take home" 
       btn.addEventListener("click", () => destroyShow(li))
       li.append(btn)
   }
   appendShowForm(rock)
}

function destroyShow(li){
    fetch(`http://localhost:3000/shows/${li.id}`, {
        method: "DELETE"
    }).then(r => r.json()).then(() => takeHome(li))
}

function takeHome(li){
    li.remove()
}

function appendShowForm(rock){
    const showForm = `
        <form id="showForm">
            <label>What did ${rock.name} bring today? </label>
            <input id="showContent"/>
            <input type="submit"></input>
        </form>
        `
    showAndTellContainer.innerHTML += showForm
    document.getElementById('showForm').addEventListener('submit', addShow)
}

function addShow(e){ 
    e.preventDefault()
    const show = e.target.children[1].value
    debugger
}