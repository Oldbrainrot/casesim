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
