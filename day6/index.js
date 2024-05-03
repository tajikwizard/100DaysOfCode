const cells = document.querySelectorAll(".cell");
const edit = document.querySelector(".edit");
const input = document.getElementById("input");
const overlay = document.querySelector(".overlay-container");
const wrapper = document.querySelector(".wrapper");
const startButton = document.getElementById("startButton");

const players = ["X", "O"];

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    cell.style.backgroundColor = "#7623f8";
  });
});
const editButtons = document.querySelectorAll(".edit");
edit.addEventListener("click", function (e) {
  overlay.style.display = "block";
});

editButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const parentPlayer = this.parentElement;
    const playerNameElement = parentPlayer.querySelector(".player-name");
    const playerName = playerNameElement.innerText;
    const playerNameInput = document.getElementById("input");
    const btnConfirm = document.getElementById("btnConfirm");
    const cancel = document.getElementById("btnCancel");

    playerNameInput.value = playerName;

    document.body.classList.add("overlay");

    btnConfirm.addEventListener("click", function (e) {
      playerNameElement.innerText = playerNameInput.value;
      document.body.classList.remove("overlay");
      overlay.style.display = "none";
    });

    cancel.addEventListener("click", function (e) {
      document.body.classList.remove("overlay");
    });

    e.stopPropagation();
  });
});

startButton.addEventListener("click", function () {
  wrapper.style.display = "block";
});
