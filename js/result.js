function render(track = getDefaultTrack()){
    const artist = document.querySelector(".artist");
    const title = document.querySelector(".title");
    const duration = document.querySelector(".duration span")
    const bg = document.querySelector("body")

    artist.textContent = track.artist;
    title.textContent = track.name;
    duration.textContent = track.duration
    bg.style.backgroundImage = `url('${track.cover}')`
}

let urlTrack, spotifyTrack;

async function getSpotifyTrack(id){
    spotifyTrack = await fetchTrack(id);
}

function getDefaultTrack(){
    return new Track("", "--", "N/A", "Não Encontrado")
        .setDuration(0)
        .setCover("https://i.imgur.com/0klEYzO.png")
        .setReleaseDate("")
        .setPrecision("N/A")
        .setOffset("N/A")
        .setGenre("Não Especificado");
}

function getURLTrack(){
    const url = new URLSearchParams(window.location.search);
    urlTrack = new Track(url.get("spotify"), url.get("track"), url.get("artist"), url.get("album"))
        .setReleaseDate(url.get("release"))
        .setPrecision(url.get("score"))
        .setGenre(url.get("genre"))
        .setOffset(url.get("offset"))
        .setDuration(url.get("duration"))
}

function mixTracks(){
    return Object.assign(getDefaultTrack(), urlTrack, spotifyTrack)
}

function init(){
    getURLTrack()
    getSpotifyTrack(urlTrack.id)
        .then(mixTracks)
        .then(render)
}

init();