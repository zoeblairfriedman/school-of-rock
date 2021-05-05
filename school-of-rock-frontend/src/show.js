function appendShows(rock, rockDiv){
    const showAndTell = document.createElement("p")
    let text = "Show & Tells: " 
    for (let show of rock.shows){
        text += ` ${show.name}`
    }
    showAndTell.innerText = text
    showAndTell.className = "show"
    rockDiv.append(showAndTell)
}