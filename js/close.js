document.addEventListener('tizenhwkey', (e) => {
    if(e.keyName === "back"){
        if(location.pathname === "/index.html")
        return tizen.application.getCurrentApplication().exit();

        window.history.back();
        location.reload();
    }
})