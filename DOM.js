const login = document.querySelector("#login")
const password = document.querySelector("#password")
const submit = document.querySelector("#submit")
const login5 = document.querySelector("#login5")
const password5 = document.querySelector("#password5")
const submit5 = document.querySelector("#submit5")



submit.addEventListener("click", (e) => {
    e.preventDefault()
    const login1 = login.value
    const password1 = password.value
    
    if (login1.length === 0 || password1.length === 0) {
        alert("Заповніть всі поля!")
        return
    }

    fetch("http://localhost:10000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            login: login1,
            password: password1
        })
    })
    .then(res => {
        if (res.ok) {
            window.location.href = "home.html"
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => console.error(err))
})



submit5.addEventListener("click", async (e) => {
    e.preventDefault()
    const loginVal = login5.value
    const passwordVal = password5.value

    if (!loginVal || !passwordVal) {
        alert("Заповніть всі поля!")
        return
    }

    try {
        const res = await fetch("http://localhost:10000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login: loginVal, password: passwordVal })
        })
        
        const data = await res.json()
        console.log(data)

        if (res.ok) {
            window.location.href = "home.html"
        } else {
            alert("Невірний логін або пароль")
        }
    } catch (err) {
        console.error(err)
    }
})

