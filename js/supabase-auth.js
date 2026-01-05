// ===============================
// SUPABASE CONFIG
// ===============================

const SUPABASE_URL = "https://caoyjwgzoubmajtlgshw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhb3lqd2d6b3VibWFqdGxnc2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MDI3MzMsImV4cCI6MjA4MzE3ODczM30.d1LEUjEMS-AfbBYdMPORpwsj-0QQmfSVjKriJXlRzbk";

// ⚠️ GLOBAL CLIENT (ONLY ONCE)
window.supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// SEND OTP (MAGIC LINK)
// ===============================
async function sendOTP() {
  const email = document.getElementById("loginEmail").value;

  if (!email) {
    alert("Email required");
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://pranshu-09.vercel.app/pre-page.html"
    }
  });

  if (error) {
    alert(error.message);
  } else {
    alert("OTP / Magic link sent to your email");
  }
}
