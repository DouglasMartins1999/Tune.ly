class Track {
    constructor(id, name, artist, album){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.album = album;
    }

    setDuration(time){
        this.duration = time ? parseInt(time) : time;
        return this;
    }

    setReleaseDate(date){
        this.releasedAt = date ? new Date(date): date;
        return this;
    }

    setCover(url){
        this.cover = url;
        return this;
    }

    setPreview(url){
        this.preview = url;
        return this;
    }

    setPrecision(score){
        this.precision = score ? parseInt(score) : score;
        this.precision = isNaN(this.precision) ? score : this.precision;
        return this;
    }

    setOffset(offset){
        this.offset = offset ? parseInt(offset) : offset;
        this.offset = isNaN(this.offset) ? offset : this.offset;
        return this;
    }

    setGenre(main){
        this.genre = main;
        return this;
    }

    setVariousArtists(artists = []){
        this.artist = artists.join(", ")
        return this;
    }
}

function getSearchQuery(track = new Track(), toStore = false){
    const enc = encodeURIComponent;
    const params = {
        track: track.name,
        artist: track.artist,
        album: track.album,
        duration: track.duration,
        release: track.releasedAt,
        score: track.precision,
        spotify: track.id,
        genre: track.genre,
        offset: track.offset
    }

    if(toStore){
        params.reg = true;
    }

    return Object.keys(params)
        .filter(key => !!params[key])
        .map(key => `${key}=${enc(params[key])}`)
        .join("&")
}