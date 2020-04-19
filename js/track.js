class Track {
    constructor(id, name, artist, album){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.album = album;
    }

    setDuration(time){
        this.duration = time ? moment(parseInt(time)).format("mm:ss") : time;
        return this;
    }

    setReleaseDate(date){
        this.releasedAt = date ? moment(date): date;
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