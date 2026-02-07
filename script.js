const reveals = document.querySelectorAll(".reveal");
const textarea = document.getElementById("letterInput");
const waxSeal = document.getElementById("waxSeal");
const modal = document.getElementById("confirmModal");
const lettersContainer = document.getElementById("lettersContainer");

let burnTarget = null;
let burnType = null;

/* 🌊 SCROLL REVEAL */
function revealOnScroll() {
  const trigger = window.innerHeight * 0.75;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* 🕯️ DARK MODE */
function toggleCandle() {
  document.body.classList.toggle("candle");
}

/* 💾 STORAGE */
function saveLetters() {
  const texts = [...document.querySelectorAll(".letter p")]
    .map(p => p.textContent);
  localStorage.setItem("letters", JSON.stringify(texts));
}

function loadLetters() {
  const saved = JSON.parse(localStorage.getItem("letters")) || [];
  saved.forEach(text => createLetter(text, false));
}

/* ✉️ CREATE LETTER */
function createLetter(text, save = true) {
  const letter = document.createElement("div");
  letter.className = "letter";

  letter.innerHTML = `
    <p>${text}</p>
    <small>— Sealed, never sent</small>
    <br><br>
    <button class="burn-btn">Burn</button>
  `;

  letter.querySelector(".burn-btn").onclick = () => {
    burnTarget = letter;
    burnType = "archive";
    modal.style.display = "flex";
  };

  lettersContainer.prepend(letter);
  if (save) saveLetters();
}

/* 🔴 SEAL LETTER */
function sealLetter() {
  if (!textarea.value.trim()) return;

  waxSeal.style.opacity = 1;
  setTimeout(() => waxSeal.style.opacity = 0, 2500);

  createLetter(textarea.value.trim());
  textarea.value = "";
}

/* 🔥 BURN DRAFT */
function burnDraft() {
  if (!textarea.value.trim()) return;
  burnType = "draft";
  modal.style.display = "flex";
}

/* 🔥 CONFIRM BURN */
function confirmBurn() {
  if (burnType === "draft") {
    textarea.classList.add("burning");
    setTimeout(() => {
      textarea.value = "";
      textarea.classList.remove("burning");
    }, 1200);
  }

  if (burnType === "archive" && burnTarget) {
    burnTarget.classList.add("burning");
    setTimeout(() => {
      burnTarget.remove();
      saveLetters();
      burnTarget = null;
    }, 1200);
  }

  modal.style.display = "none";
}

/* ❌ CANCEL */
function closeModal() {
  burnTarget = null;
  burnType = null;
  modal.style.display = "none";
}

/* 🚀 INIT */
loadLetters();
