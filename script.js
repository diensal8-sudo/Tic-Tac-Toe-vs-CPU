const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],   // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columns
  [0, 4, 8], [2, 4, 6],              // diagonals
];

const boardEl = document.getElementById("board");
const message = document.getElementById("message");
const stats = JSON.parse(localStorage.getItem("tris-stats")) || { wins: 0, draws: 0, losses: 0 };

let cells, board, playing;

function showStats() {
  document.getElementById("wins").textContent = stats.wins;
  document.getElementById("draws").textContent = stats.draws;
  document.getElementById("losses").textContent = stats.losses;
}

function newGame() {
  board = Array(9).fill("");
  playing = true;
  message.textContent = "Your turn: you are X";
  boardEl.innerHTML = "";
  cells = board.map((_, i) => {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.addEventListener("click", () => playerMove(i));
    boardEl.appendChild(cell);
    return cell;
  });
}

function place(i, who) {
  board[i] = who;
  cells[i].textContent = who;
  cells[i].classList.add(who.toLowerCase());
  cells[i].disabled = true;
}

function findWinner() {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { who: board[a], line };
    }
  }
  return null;
}

function finish(result) {
  playing = false;
  if (result === "X") { stats.wins++; message.textContent = "You win!"; }
  else if (result === "O") { stats.losses++; message.textContent = "The CPU wins"; }
  else { stats.draws++; message.textContent = "It's a draw"; }
  localStorage.setItem("tris-stats", JSON.stringify(stats));
  showStats();
  const w = findWinner();
  if (w) w.line.forEach((i) => cells[i].classList.add("win"));
  cells.forEach((c) => (c.disabled = true));
}

function checkEnd() {
  const w = findWinner();
  if (w) { finish(w.who); return true; }
  if (board.every((c) => c)) { finish("draw"); return true; }
  return false;
}

// a cell that completes a line for `who`, if there is one
function findCompleting(who) {
  for (const [a, b, c] of LINES) {
    const line = [a, b, c];
    const mine = line.filter((i) => board[i] === who).length;
    const empty = line.filter((i) => board[i] === "");
    if (mine === 2 && empty.length === 1) return empty[0];
  }
  return -1;
}

function cpuChoice() {
  let move = findCompleting("O");            // 1. win
  if (move < 0) move = findCompleting("X");  // 2. block
  if (move < 0 && board[4] === "") move = 4; // 3. centre
  if (move < 0) {                            // 4. a corner, else any cell
    const free = board.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0);
    const corners = free.filter((i) => [0, 2, 6, 8].includes(i));
    const pool = corners.length ? corners : free;
    move = pool[Math.floor(Math.random() * pool.length)];
  }
  return move;
}

function playerMove(i) {
  if (!playing || board[i]) return;
  place(i, "X");
  if (checkEnd()) return;
  playing = false;
  message.textContent = "CPU is thinking...";
  setTimeout(() => {
    place(cpuChoice(), "O");
    if (checkEnd()) return;
    playing = true;
    message.textContent = "Your turn";
  }, 500);
}

document.getElementById("restart").addEventListener("click", newGame);
showStats();
newGame();