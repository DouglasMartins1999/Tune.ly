function render(track = getDefaultTrack()){
    const release = moment(track.releasedAt)
    document.querySelector(".artist").textContent = track.artist;
    document.querySelector(".title").textContent = track.name;
    document.querySelector(".duration span").textContent = moment(track.duration).format("mm:ss")
    document.querySelector(".score").textContent = track.precision + "%";
    document.querySelector("#album").textContent = track.album
    document.querySelector("#genre").textContent = track.genre
    document.querySelector("#offset").textContent = moment(track.offset).format("mm:ss")
    document.querySelector("body").style.backgroundImage = `url('${track.cover}')`;

    document.querySelector("#day").textContent = release.format("DD")
    document.querySelector("#month").textContent = release.format("MMM").toUpperCase()
    document.querySelector("#year").textContent = release.format("YYYY")

    document.querySelector("#spotify").href = "spotify:track:" + track.id;
}

let urlTrack, spotifyTrack, isStored;

async function getSpotifyTrack(id){
    spotifyTrack = await fetchTrack(id);
}

function getDefaultTrack(){
    return new Track(undefined, "--", "N/A", "Não Encontrado")
        .setDuration(0)
        .setCover("../images/main_bg.png")
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