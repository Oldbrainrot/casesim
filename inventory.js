let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function addToInventory(item) {
  inventory.push(item);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  renderInventory();
}

function renderInventory() {
  const invDiv = document.getElementById("inventory");
  invDiv.innerHTML = "";

  inventory.forEach(item => {
    let el = document.createElement("div");
    el.className = "item " + item.rarity;
    el.innerHTML = `<img src="${item.img}" width="80"><p>${item.name}</p>`;
    invDiv.appendChild(el);
  });
}
