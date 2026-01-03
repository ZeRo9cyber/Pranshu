/* =========================
   DOM ELEMENTS
========================= */
const header = document.querySelector("header");
const navLinks = document.querySelector(".nav-links");
const hamburger = document.querySelector(".hamburger");
const navLinksItems = document.querySelectorAll(".nav-links li");

const themeToggle = document.querySelector(".theme-toggle");
const moonIcon = document.querySelector(".fa-moon");
const sunIcon = document.querySelector(".fa-sun");

const contactForm = document.getElementById("contact-form");

/* =========================
   HEADER SCROLL EFFECT
========================= */
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("header-scroll");
  } else {
    header.classList.remove("header-scroll");
  }
});

/* =========================
   MOBILE NAVIGATION
========================= */
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
  hamburger.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

navLinksItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("nav-active");
    hamburger.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});

/* =========================
   THEME TOGGLE (DARK/LIGHT)
========================= */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    localStorage.setItem("theme", "light");
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    localStorage.setItem("theme", "dark");
  }
});

/* Load saved theme */
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
  }
});

/* =========================
   SECTION ANIMATION (SCROLL)
========================= */
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-animate");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

/* =========================
   HERO BINARY TYPING EFFECT
========================= */
const binaryElement = document.querySelector(".binary");

if (binaryElement) {
  const text = binaryElement.innerText;
  binaryElement.innerText = "";
  let i = 0;

  function typeBinary() {
    if (i < text.length) {
      binaryElement.innerText += text.charAt(i);
      i++;
      setTimeout(typeBinary, 40);
    }
  }

  setTimeout(typeBinary, 800);
}

/* =========================
   CONTACT FORM HANDLER
========================= */
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill all fields");
      return;
    }

    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>Thank you <strong>${name}</strong>, your message has been sent successfully.</p>
    `;

    contactForm.innerHTML = "";
    contactForm.appendChild(successMessage);
  });
}

/* =========================
   CERTIFICATE IMAGE POPUP
========================= */
const certCards = document.querySelectorAll(".certification-card");
const popup = document.getElementById("certificatePopup");
const popupImage = document.getElementById("popupImage");

certCards.forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector(".certificate-preview img");
    if (img) {
      popupImage.src = img.src;
      popup.style.display = "flex";
    }
  });
});

popup.addEventListener("click", () => {
  popup.style.display = "none";
});

/* =========================
   SECURE RESOURCE LOGIN MODAL
========================= */
const loginModal = document.getElementById("loginModal");
const loginInput = document.getElementById("loginInput");
const otpInput = document.getElementById("otpInput");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

function openLogin() {
  loginModal.style.display = "flex";
}

function closeLogin() {
  loginModal.style.display = "none";
  loginInput.value = "";
  otpInput.value = "";
  otpInput.style.display = "none";
  verifyOtpBtn.style.display = "none";
  sendOtpBtn.style.display = "block";
}

function sendOTP() {
  if (!loginInput.value.trim()) {
    alert("Enter Email or Phone");
    return;
  }

  alert("OTP Sent (Demo)");
  otpInput.style.display = "block";
  verifyOtpBtn.style.display = "block";
  sendOtpBtn.style.display = "none";
}

function verifyOTP() {
  if (!otpInput.value.trim()) {
    alert("Enter OTP");
    return;
  }

  alert("Access Granted (Demo)");
  closeLogin();
}

/* =========================
   EXPOSE FUNCTIONS TO HTML
========================= */
window.openLogin = openLogin;
window.closeLogin = closeLogin;
window.sendOTP = sendOTP;
window.verifyOTP = verifyOTP;

