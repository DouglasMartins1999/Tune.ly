function render(track = getDefaultTrack()){
    const artist = document.querySelector(".artist");
    const title = document.querySelector(".title");
    const duration = document.querySelector(".duration span")
    const bg = document.querySelector("body")

    artist.textContent = track.artist;
    title.textContent = track.name;
    duration.textContent = moment(track.duration).format("mm:ss")
    bg.style.backgroundImage = `url('${track.cover}')`
}

let urlTrack, spotifyTrack, isStored;

async function getSpotifyTrack(id){
    spotifyTrack = await fetchTrack(id);
}

function getDefaultTrack(){
    return new Track(undefined, "--", "N/A", "Não Encontrado")
        .setDuration(0)
        .setCover("https://i.imgur.com/0klEYzO.png")
        .setReleaseDate("")
        .setPrecision("N/A")
        .setOffset("N/A")
        .setGenre("Não Especificado");
}

function getURLTrack(){
    const url = new URLSearchParams(window.location.search);
    isStored = !url.get("reg");
    urlTrack = new Track(url.get("spotify"), url.get("track"), url.get("artist"), url.get("album"))
        .setReleaseDate(url.get("release"))
        .setPrecision(url.get("score"))
        .setGenre(url.get("genre"))
        .setOffset(url.get("offset"))
        .setDuration(url.get("duration"))
}

function mixTracks(){
    const track = getDefaultTrack();

    for(let key in track){
        track[key] = spotifyTrack[key] || urlTrack[key] || track[key];
    }

    return track;
}

function storeTrack(track){
    return new Promise((resolve) => {
        if(isStored) return resolve(track);
        const request = indexedDB.open("tune.ly", 1);

        request.onerror = console.error
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(["tracks"], "readwrite");
            const objStore = transaction.objectStore("tracks");
            const data = JSON.parse(JSON.stringify(track));
            
            objStore.add(data);
    
            transaction.oncomplete = evt => resolve(track);
            transaction.onerror = evt => resolve(track);
        };

        request.onupgradeneeded = function(event) { 
            const db = event.target.result;
            const objStore = db.createObjectStore("tracks", { keyPath: "key", autoIncrement: true });
            objStore.createIndex("id", "id", { unique: true });
            objStore.createIndex("track", ["name", "artist", "album"], { unique: true });
        };
    })
}

function init(){
    getURLTrack()
    getSpotifyTrack(urlTrack.id)
        .then(mixTracks)
        .then(storeTrack)
        .then(render)
}

init();