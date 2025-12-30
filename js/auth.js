function login() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (!email || !password) return;

  if (email.value.trim() && password.value.trim()) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Fill all fields");
  }
}

// ===== PROTECT DASHBOARD =====
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}
/*====register===*/
function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;
  const msg = document.getElementById("registerMsg");

  if (!name || !email || !password || !confirm) {
    msg.style.color = "red";
    msg.innerText = "All fields are required!";
    return;
  }

  if (password !== confirm) {
    msg.style.color = "red";
    msg.innerText = "Passwords do not match!";
    return;
  }

  // Save user (demo purpose – localStorage)
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  msg.style.color = "#3cf5ff";
  msg.innerText = "Registration successful! Redirecting...";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

/*=======login funtion=====*/
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    msg.style.color = "#3cf5ff";
    msg.innerText = "Login successful!";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    msg.style.color = "red";
    msg.innerText = "Invalid credentials!";
  }
}
