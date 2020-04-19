function prepareQuery(blob){
    const timestamp = new Date().getTime() / 1000;
    const signer = new jsSHA("SHA-1", "TEXT", { encoding: "UTF8" });
    const { access_secret, access_key } = auth.ACRCloud;
    const stringToSign = ["POST", '/v1/identify', access_key, "audio", "1", timestamp].join('\n');
    
    signer.setHMACKey(access_secret, "TEXT");
    signer.update(stringToSign)

    identifyTrack(blob, timestamp, signer, access_key)
}

function identifyTrack(blob, timestamp, signer, access_key){
    const url = "http://identify-eu-west-1.acrcloud.com/v1/identify";
    const signature = signer.getHMAC("B64");
    const formdata = new FormData();
    const options = { method: 'POST', body: formdata }

    formdata.append("sample", blob);
    formdata.append("access_key", access_key);
    formdata.append("data_type", "audio");
    formdata.append("signature_version", "1");
    formdata.append("signature", signature);
    formdata.append("sample_bytes", blob.size);
    formdata.append("timestamp", timestamp);

    fetch(url, options)
        .then(resp => resp.json())
        .then(resultAnalyze)
        .catch(connectionError)
}

function connectionError(e){
    console.error(e);
    alert("Houve um erro durante sua consulta. Verifique sua conexão");
    restore()
}

function resultAnalyze(res){
    const data = res.metadata && res.metadata.music && res.metadata.music[0];
    if(data) return redirect(data);
    
    alert("Não foi possível identificar essa amostra")
    restore();    
}

function redirect(data = {}){
    const exmt = data.external_metadata;
    const artist = data.artists && data.artists[0] && data.artists[0].name
    const album = data.album && data.album.name
    const spotify = exmt && exmt.spotify && exmt.spotify.track && exmt.spotify.track.id
    const genre = data.genres && data.genres[0] && data.genres[0].name
    
    const track = new Track(spotify, data.title, artist, album)
        .setDuration(data.duration_ms)
        .setReleaseDate(data.release_date)
        .setPrecision(data.score)
        .setGenre(genre)
        .setOffset(data.play_offset_ms);

    window.location.href = "result.htm?" + getSearchQuery(track, true);
}