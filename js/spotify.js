function getToken(){
    const basic = btoa(auth.spotify.clientID + ":" + auth.spotify.secretID);
    const options = {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: { 
            "Authorization": "Basic " + basic,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    return fetch("https://accounts.spotify.com/api/token", options)
        .then(resp => resp.json())
        .then(resp => resp.access_token)
}

async function fetchTrack(id){
    const url = "https://api.spotify.com/v1/tracks/" + id;
    const token = await getToken();
    let data = await fetch(url, {
        headers: { Authorization: "Bearer " + token }
    }).then(resp => resp.json())

    return new Track(id, data.name, "", data.album && data.album.name)
        .setDuration(data.duration_ms)
        .setCover(data.album && data.album.images && data.album.images[0] && data.album.images[0].url)
        .setReleaseDate(data.album && data.album.release_date)
        .setPreview(data.preview_url)
        .setVariousArtists(data.artists && data.artists.map(item => item.name))
}