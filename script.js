const reveals = document.querySelectorAll(".reveal");
const textarea = document.getElementById("letterInput");
const waxSeal = document.getElementById("waxSeal");
const modal = document.getElementById("confirmModal");
const lettersContainer = document.getElementById("lettersContainer");

let pendingArchiveBurn = null;
let burningDraft = false;

/* SCROLL REVEAL */
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

/* CANDLE MODE */
function toggleCandle() {
  document.body.classList.toggle("candle");
}

/* SEAL LETTER */
function sealLetter() {
  if (!textarea.value.trim()) return;

  waxSeal.style.opacity = 1;
  setTimeout(() => waxSeal.style.opacity = 0, 3000);

  const letter = document.createElement("div");
  letter.className = "letter";
  letter.innerHTML = `
    <p>${textarea.value}</p>
    <small>— Sealed, never sent</small>
    <div class="archive-actions">
      <button onclick="openArchiveBurn(this)">Burn Letter</button>
    </div>
  `;

  lettersContainer.prepend(letter);
  textarea.value = "";
}

/* OPEN BURN CONFIRMATION (ARCHIVE) */
function openArchiveBurn(button) {
  pendingArchiveBurn = button.closest(".letter");
  burningDraft = false;
  modal.style.display = "flex";
}

/* BURN DRAFT */
function burnDraft() {
  if (!textarea.value.trim()) return;
  burningDraft = true;
  modal.style.display = "flex";
}

/* CONFIRM BURN */
function confirmBurn() {
  if (burningDraft) {
    textarea.value = "";
    burningDraft = false;
  }

  if (pendingArchiveBurn) {
    pendingArchiveBurn.style.opacity = 0;
    pendingArchiveBurn.style.transform = "translateY(20px)";
    setTimeout(() => pendingArchiveBurn.remove(), 800);
    pendingArchiveBurn = null;
  }

  modal.style.display = "none";
}

/* CLOSE MODAL */
function closeModal() {
  pendingArchiveBurn = null;
  burningDraft = false;
  modal.style.display = "none";
}
