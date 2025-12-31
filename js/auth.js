/* ================= REGISTER ================= */

function register() {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const confirm = document.getElementById("regConfirm").value.trim();
    const msg = document.getElementById("registerMsg");

    if (!name || !email || !password || !confirm) {
        msg.style.color = "red";
        msg.innerText = "All fields are required";
        return;
    }

    if (password !== confirm) {
        msg.style.color = "red";
        msg.innerText = "Passwords do not match";
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    msg.style.color = "lightgreen";
    msg.innerText = "Registration successful! Redirecting...";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1200);
}

/* ================= LOGIN ================= */

function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const msg = document.getElementById("loginMsg");

    if (!email || !password) {
        msg.style.color = "red";
        msg.innerText = "Enter email & password";
        return;
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        msg.style.color = "red";
        msg.innerText = "Please register first!";
        return;
    }

    const user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {
        localStorage.setItem("loggedIn", "true");
        msg.style.color = "lightgreen";
        msg.innerText = "Login successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "pre-page.html";
        }, 1000);
    } else {
        msg.style.color = "red";
        msg.innerText = "Invalid email or password";
    }
}

/* ================= PROTECT PAGES ================= */

if (
    window.location.pathname.includes("pre-page.html") ||
    window.location.pathname.includes("dashboard.html")
) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

/* ================= LOGOUT ================= */

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

/* ================= SHOW / HIDE LOGOUT BUTTON ================= */

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    if (localStorage.getItem("loggedIn") === "true") {
        logoutBtn.style.display = "inline-block";
    } else {
        logoutBtn.style.display = "none";
    }
});
