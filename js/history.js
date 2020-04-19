const list = document.querySelector(".list");

function fetchTracks(){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("tune.ly", 1);

        request.onerror = reject
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(["tracks"]);
            const objStore = transaction.objectStore("tracks");
            const request = objStore.getAll();
            
            request.onsuccess = evt => resolve(request.result)
            transaction.onerror = reject;
        };
    })
}

function removeTrack(key){
    return new Promise((resolve, reject) => {
        const shouldRemove = confirm("Tem certeza que deseja remover essa faixa da sua lista?");
        if(!shouldRemove) return;

        const request = indexedDB.open("tune.ly", 1);

        request.onerror = reject
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(["tracks"], "readwrite")
            const objStore = transaction.objectStore("tracks");
            const request = objStore.delete(key);
            
            request.onsuccess = init
            transaction.onerror = reject;
        };
    })
}

function render(tracks = []){
    list.innerHTML = "";

    if(tracks.length == 0){
        alert("Você ainda não identificou músicas");
        history.back();
    }

    for(let item of tracks){
        const li = document.createElement("li");
        const section = document.createElement("section");
        const name = document.createElement("div")
        const artist = document.createElement("div");
        const remove = document.createElement("button");

        name.className = "track";
        artist.className = "artist";

        name.textContent = item.name;
        artist.textContent = item.artist;

        remove.onclick = () => removeTrack(item.key);
        li.onclick = () => {
            location.href = "result.htm?" + getSearchQuery(item)
        }

        section.appendChild(name);
        section.appendChild(artist);

        li.appendChild(section);
        li.appendChild(remove);
        
        list.appendChild(li)
    }
}

function init(){
    fetchTracks().then(render)
}

init()