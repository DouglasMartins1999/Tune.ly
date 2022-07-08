const link = document.querySelector("#link");
const btnVal = document.querySelector("#validate");

btnVal.addEventListener("click", async function() {
    await fetch(link.value)
        .then(resp => resp.text())
        .then(data => localStorage.setItem("auth", JSON.stringify(data.replace(/\n/g, "").split(";"))))
        .then(() => window.location.href = "index.html")
        .catch(() => alert("Não foi possível obter as credenciais. Confira o link inserido, se o conteúdo está formatado corretamente e tente novamente."));
});