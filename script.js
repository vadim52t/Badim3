
const symbols = ["🔨", "💎", "⚡", "🛡️", "🔮", "🪙"];
let balance = 10000;
let win = 0;
let inBonus = false;
let bonusSpinsLeft = 0;
let totalBonusWin = 0;

function generateGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        grid.appendChild(cell);
    }
}

function spin() {
    let bet = parseInt(document.getElementById("bet").value) || 100;
    if (balance < bet) return alert("Недостаточно монет!");

    generateGrid();
    let matched = Math.floor(Math.random() * 3) + 8;
    win = matched * bet;
    balance += win - bet;

    document.getElementById("balance").textContent = balance;
    document.getElementById("win").textContent = win;

    if (inBonus) {
        totalBonusWin += win;
        bonusSpinsLeft--;
        if (bonusSpinsLeft > 0) {
            setTimeout(spin, 1000);
        } else {
            alert("Бонус завершён! Выигрыш: " + totalBonusWin);
            inBonus = false;
        }
    }
}

function buySpins() {
    let bet = parseInt(document.getElementById("bet").value) || 100;
    let cost = bet * 100;
    if (balance < cost) return alert("Недостаточно монет!");
    balance -= cost;
    bonusSpinsLeft = 15;
    totalBonusWin = 0;
    inBonus = true;
    spin();
}

function recharge() {
    balance += 10000;
    document.getElementById("balance").textContent = balance;
}
