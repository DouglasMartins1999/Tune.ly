const creds = JSON.parse(localStorage.getItem("auth") || "[]");

const auth = {
    ACRCloud: {
        host: creds[0],
        access_key: creds[1],
        access_secret: creds[2],
    },
    spotify: {
        clientID: creds[3],
        secretID: creds[4],
    }
}