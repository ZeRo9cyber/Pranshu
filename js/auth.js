// js/auth.js

// 🔐 LOGIN
async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");

  msg.innerText = "Logging in...";

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    msg.innerText = error.message;
    return;
  }

  window.location.href = "pre-page.html";
}

// 📝 REGISTER
async function registerUser() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;
  const msg = document.getElementById("msg");

  msg.style.color = "red";

  if (!name || !email || !password || !confirm) {
    msg.innerText = "All fields are required";
    return;
  }

  if (password.length < 6) {
    msg.innerText = "Password must be 6+ characters";
    return;
  }

  if (password !== confirm) {
    msg.innerText = "Passwords do not match";
    return;
  }

  msg.innerText = "Creating account...";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }
    }
  });

  if (error) {
    msg.innerText = error.message;
    return;
  }

  msg.style.color = "#3cf5ff";
  msg.innerText = "Verification mail sent. Check inbox / spam.";
}

// 🔒 PROTECTED PAGE CHECK
async function protectPage() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
  }
}

// 🚪 LOGOUT
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
