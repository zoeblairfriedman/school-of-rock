class API {

// can't get this to work:
    // constructor(){
    //     this.baseUrl = "http://locahost:3000/"
    // }

    postFetch(resource, body){
       return fetch(`http://localhost:3000/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        },
        body: JSON.stringify(body)
        })
        .then(jsonToJS)

    }

    deleteFetch(resource, id){
        return fetch(`http://localhost:3000/${resource}/${id}`, {
            method: "DELETE"
        })
        
    }
}