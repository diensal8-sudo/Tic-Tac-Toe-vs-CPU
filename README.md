# Tic-Tac-Toe vs CPU

Tic-Tac-Toe against the computer, built from scratch with **HTML, CSS and JavaScript**. No libraries, no frameworks.

> 🎮 **Play it:** add your GitHub Pages link here (`https://your-name.github.io/tic-tac-toe/`)

Part of the *Feral Frame Studio* series: small projects built step by step.

## How to play

- You are **X** and you start. The computer is **O**.
- Click an empty cell to place your X. The computer answers after half a second.
- Three in a row (horizontal, vertical or diagonal) wins, and the winning cells turn green.
- The score (your wins, draws, computer wins) is saved in the browser.
- **New game** starts a new match.

## On phones

It works on phones too: you just tap. The layout adapts to narrow screens.

## The files

| File | What it does |
|---|---|
| `index.html` | Title, the three counters and the empty board |
| `style.css` | The 3-column grid, the colors of X and O, the green winning cells |
| `script.js` | The logic and the "brain" of the computer |

## The main ideas

**1. The board is a list of 9 places.** Each one is empty (`""`), `"X"` or `"O"`. Places are numbered 0 to 8, left to right, top to bottom.

```js
board = Array(9).fill("");
```

**2. Placing a mark does three things.** It saves the mark in the list, writes it on the cell, and disables the button.

**3. Turns.** After your move the computer plays with `setTimeout` (500 ms), so it does not answer instantly. While it "thinks", `playing` is `false` and you cannot click.

**4. Who won?** There are only 8 winning lines, written as a list of lists:

```js
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],   // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columns
  [0, 4, 8], [2, 4, 6],              // diagonals
];
```

For each line we check whether the three places are equal and not empty. If nobody won and the board is full, it's a draw.

**5. The brain of the computer.** Four rules, in order:

1. If it can **win**, it wins.
2. If you could win next move, it **blocks** you.
3. It takes the **center**, if free.
4. Otherwise it takes a random **corner**, or any free cell.

Rules 1 and 2 use the same function, `findCompleting(who)`: it looks for a line with two marks of `who` and one empty cell, and returns that empty cell. It is called first for `"O"` (win), then for `"X"` (block).

**6. The score.** Saved in `localStorage` as one object:

```js
localStorage.setItem("tris-stats", JSON.stringify(stats));
```

## Settings to play with

- In `cpuChoice()`, remove a rule to make the computer weaker (for example, remove the block).
- Change the `500` in `setTimeout` to make the computer faster or slower.

## Run it on your computer

Download the three files in the same folder and open `index.html` in a browser.

## Put it online (GitHub Pages)

1. Create a new public repository on GitHub (for example `tic-tac-toe`).
2. Upload `index.html`, `style.css` and `script.js`.
3. Go to **Settings → Pages**, choose branch **main**, folder **/ (root)**, and save.
4. After a minute or two your link appears. Paste it in the repository's **Website** field.

## Ideas to extend it

- An unbeatable computer with the **Minimax** algorithm
- A two-player mode
- A bigger board (4×4)
- Choose who starts

---

## 🇮🇹 In italiano

Il **Tris** contro il computer, fatto da zero con HTML, CSS e JavaScript.

**Come si gioca:** tu sei la **X** e inizi. Clicca una cella vuota: il computer (la **O**) risponde dopo mezzo secondo. Tre in fila (riga, colonna o diagonale) vincono e le celle vincenti diventano verdi. Il punteggio resta salvato nel browser.

**Le idee principali:** la griglia è una **lista di 9 posti**; le **8 linee vincenti** sono una lista di liste; il computer segue **4 regole**: vince se può, **blocca** te, prende il **centro**, poi un **angolo**. Il punteggio vive in **localStorage**.

**Su telefono:** funziona anche con il tocco.

**Per provarlo:** metti i tre file nella stessa cartella e apri `index.html`. Per metterlo online usa **GitHub Pages**.
