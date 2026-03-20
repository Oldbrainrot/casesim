const itemsPool = [
  {name: "Common Skin", rarity: "common", chance: 60},
  {name: "Rare Skin", rarity: "rare", chance: 25},
  {name: "Epic Skin", rarity: "epic", chance: 10},
  {name: "Legendary Skin", rarity: "legendary", chance: 5},
];

const itemsDiv = document.getElementById("items");

function getRandomItem() {
  let rand = Math.random() * 100;
  let sum = 0;

  for (let item of itemsPool) {
    sum += item.chance;
    if (rand <= sum) return item;
  }
}

function generateItems() {
  itemsDiv.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    let item = getRandomItem();
    let div = document.createElement("div");
    div.className = `item ${item.rarity}`;
    div.innerText = item.name;
    itemsDiv.appendChild(div);
  }
}

function openCase() {
  generateItems();

  const winningIndex = Math.floor(Math.random() * 30);
  const offset = winningIndex * 160;

  itemsDiv.style.transform = `translateX(-${offset}px)`;

  setTimeout(() => {
    const winItem = itemsDiv.children[winningIndex].innerText;
    document.getElementById("result").innerText = "Wygrałeś: " + winItem;
  }, 2000);
}
let balance = Number(localStorage.getItem("balance")) || 1000;

function saveBalance() {
  localStorage.setItem("balance", balance);
  document.getElementById("balance").innerText = balance;
}

function getItem(caseData) {
  let rand = Math.random() * 100;
  let sum = 0;

  for (let item of caseData.items) {
    sum += item.chance;
    if (rand <= sum) return item;
  }
}

function openCase() {
  const caseData = cases.basic;

  if (balance < caseData.price) {
    alert("Brak kasy!");
    return;
  }

  balance -= caseData.price;
  saveBalance();

  const container = document.getElementById("items");
  container.innerHTML = "";

  let rollItems = [];

  for (let i = 0; i < 50; i++) {
    let item = getItem(caseData);
    rollItems.push(item);

    let div = document.createElement("div");
    div.className = "item " + item.rarity;
    div.innerHTML = `<img src="${item.img}" width="100">`;
    container.appendChild(div);
  }

  const winIndex = 40;
  const offset = winIndex * 160;

  container.style.transform = `translateX(-${offset}px)`;

  setTimeout(() => {
    let winItem = rollItems[winIndex];
    document.getElementById("result").innerText = winItem.name;

    addToInventory(winItem);
  }, 2500);
}

window.onload = () => {
  saveBalance();
  renderInventory();
};
function upgradeItem() {
  if (inventory.length === 0) {
    alert("Brak itemów");
    return;
  }

  let chance = Number(document.getElementById("upgradeChance").value);
  if (!chance || chance <= 0 || chance > 100) {
    alert("Zła szansa");
    return;
  }

  let item = inventory.pop(); // bierze ostatni item
  let roll = Math.random() * 100;

  if (roll <= chance) {
    let upgraded = {
      name: "UPGRADED ITEM 🔥",
      rarity: "legendary",
      img: "images/knife.png"
    };

    addToInventory(upgraded);
    document.getElementById("upgradeResult").innerText = "WIN!";
  } else {
    document.getElementById("upgradeResult").innerText = "LOSE...";
  }

  renderInventory();
}
