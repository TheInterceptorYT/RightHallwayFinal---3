// ---------------- SEQUENCE PUZZLE ---------------- //
const correctSequence = ["cupcake", "pizza", "partyhat", "paperplate"];
let playerSequence = [];
let tableItems = [null, null, null, null, null];

function placeItem(itemId) {
  const tableRow = document.getElementById("tableRow");

  for (let i = 0; i < tableItems.length; i++) {
    if (!tableItems[i]) {
      tableItems[i] = itemId;

      const img = document.createElement("img");
      img.src = `images/${itemId}.png`;
      img.classList.add("contain-image");
      tableRow.children[i].appendChild(img);
      break;
    }
  }

  playerSequence.push(itemId);

  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== correctSequence[i]) {
      playerSequence = [];
      return;
    }
  }

  if (playerSequence.length === correctSequence.length) {
    moveKeyToNotepad();
    playerSequence = [];
  }
}

// Move key to where notepad originally was
function moveKeyToNotepad() {
  const notepad = document.getElementById("notepad");
  if (notepad) {
    const img = document.createElement("img");
    img.src = "images/key1.png";
    img.classList.add("contain-image");
    const parentBox = notepad.parentElement;
    parentBox.innerHTML = "";
    parentBox.appendChild(img);
    notepad.remove();
  }
}

// ---------------- MODALS ---------------- //
function openNotepad() {
  const notepad = document.getElementById("notepad");
  if (!notepad) return;

  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = "images/stickynote.png";
  modal.style.display = "flex";

  setTimeout(() => {
    if (modalImage.src.includes("stickynote.png")) {
      notepad.remove();
    }
  }, 500);
}

function showModal(imageElement) {
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imageElement.src;
  modal.style.display = "flex";
}

function hideModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) hideModal();
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") hideModal();
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myModal").style.display = "none";
});

// ---------------- INVENTORY ---------------- //
function toggleBottomRow() {
  document.getElementById("bottomRow").classList.toggle("hidden");
}

// ---------------- ROOM NAVIGATION ---------------- //
function goUp() {
  window.location.href =
    "https://theinterceptoryt.github.io/ChooseHallwayFinal---3/";
}

function goLeft() {
  window.location.href =
    "https://eternalascenttyler.github.io/FnafReturnOfTheSoulsOffice3/";
}

// ---------------- AUDIO UNLOCK ---------------- //
let audioUnlocked = false;
function unlockAudio() {
  const jumpscareAudio = document.getElementById("jumpscareAudio");
  jumpscareAudio
    .play()
    .then(() => {
      jumpscareAudio.pause();
      jumpscareAudio.currentTime = 0;
    })
    .catch(() => {});
  audioUnlocked = true;
  document.removeEventListener("click", unlockAudio);
}
document.addEventListener("click", unlockAudio);

// ------------------ WITHERED CHICA RANDOM SPAWN ------------------ //
const witheredChicaChance = 0.3; // 30% chance to spawn
const witheredChicaDuration = 10; // 10 seconds
let witheredChicaTimer;

function maybeSpawnWitheredChica() {
  if (Math.random() < witheredChicaChance) {
    spawnWitheredChica();
  }
}

function spawnWitheredChica() {
  const chica = document.createElement("img");
  chica.id = "witheredChica";
  chica.src = "images/witheredchica.png";
  chica.style.position = "fixed";
  chica.style.top = "70%";
  chica.style.left = "50%";
  chica.style.transform = "translate(-50%, -50%)";
  chica.style.zIndex = "15";
  chica.style.maxWidth = "10000px";
  chica.style.maxHeight = "10000px";
  document.body.appendChild(chica);

  // Timer display
  const timerDiv = document.createElement("div");
  timerDiv.id = "witheredChicaTimer";
  timerDiv.style.position = "fixed";
  timerDiv.style.top = "10px";
  timerDiv.style.left = "10px";
  timerDiv.style.zIndex = "20";
  timerDiv.style.padding = "10px 20px";
  timerDiv.style.color = "#fff";
  timerDiv.style.fontSize = "100px";
  timerDiv.style.fontWeight = "bold";
  timerDiv.innerText = witheredChicaDuration;
  document.body.appendChild(timerDiv);

  let timeLeft = 5;
  witheredChicaTimer = setInterval(() => {
    timeLeft--;
    timerDiv.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(witheredChicaTimer);
      triggerChicaJump();
    }
  }, 1000);
}

// ---------------- TRIGGER CHICA JUMPSCARE + GAME OVER ---------------- //
function triggerChicaJump() {
  const chica = document.getElementById("witheredChica");
  if (chica) chica.src = "gifs/witheredchicajump.gif";

  const jumpscareOverlay = document.getElementById("jumpscareOverlay");
  const jumpscareAudio = document.getElementById("jumpscareAudio");

  jumpscareOverlay.style.display = "flex";

  if (audioUnlocked) {
    jumpscareAudio.currentTime = 0;
    jumpscareAudio.play();
  }

  setTimeout(() => {
    jumpscareOverlay.style.display = "none";
    document.getElementById("gameOverScreen").style.display = "flex";
  }, 2000);
}

// ---------------- RESTART ---------------- //
document.getElementById("restartBtn")?.addEventListener("click", () => {
  location.reload();
});

// ---------------- INIT ---------------- //
window.addEventListener("DOMContentLoaded", () => {
  maybeSpawnWitheredChica();
});
