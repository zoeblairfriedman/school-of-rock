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

        rockDiv.append(rockBod, rockEyes, rockMouth)
    }
}