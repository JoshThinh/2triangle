let gameTimer;
let timeRemaining = 0;
let points = 0;
const shelves = [];
const inventory = [];

function startGame() {
  gameTimer = setInterval(updateGame, 1000);
  generateShelves();
  generateInventory();
  updateTime();
}

function updateGame() {
  timeRemaining++;
  updateTime();
  updateShelves();
  updateInventory();
  checkGameOver();
}

function generateShelves() {
  // Generate 5 shelves
  for (let i = 0; i < 5; i++) {
    const shelf = {
      number: i + 1,
      stock: Math.floor(Math.random() * 50) + 50,
      decreaseInterval: Math.floor(Math.random() * 0.2) + 1 // 0.2 * rand() + 1
    };
    shelves.push(shelf);
  }
  displayShelves();
}

function generateInventory() {
  // O(n) where n is the number of shelves
  for (const shelf of shelves) {
    const item = {
      name: `Item ${shelf.number}`,
      initialStock: shelf.stock,
      currentStock: shelf.stock,
      shelfNumber: shelf.number
    };
    inventory.push(item);
  }
  displayInventory();
}

function updateTime() {
  document.getElementById("time").textContent = timeRemaining;
}

function updateShelves() {
  // O(n) where n is the number of shelves
  for (const shelf of shelves) {
    // decrease stock every 'decreaseInterval' seconds
    if (timeRemaining % shelf.decreaseInterval === 0) {
      shelf.stock -= 1;
      if (shelf.stock < 0) {
        shelf.stock = 0;
      }
    }
  }
}

function updateInventory() {
  // O(n) where n is the number of items in the inventory
  for (const item of inventory) {
    const shelf = shelves.find(s => s.number === item.shelfNumber);
    item.currentStock = shelf.stock;
  }
  displayInventory();
}

function checkGameOver() {
  // O(n) where n is the number of shelves
  for (const shelf of shelves) {
    if (shelf.stock === 0) {
      clearInterval(gameTimer);
      alert("Game Over!");
      return;
    }
  }
}

function displayShelves() {
  const shelvesList = document.getElementById("shelves");
  shelvesList.innerHTML = "";
  // O(n) where n is the number of shelves
  for (const shelf of shelves) {
    const shelfListItem = document.createElement("li");
    const shelfButton = document.createElement("button");
    shelfButton.textContent = `Restock Shelf ${shelf.number}`;
    shelfButton.onclick = () => {
      points++;
      document.getElementById("points").textContent = points;
      updateShelf(shelf.number);
    };
    shelfListItem.appendChild(shelfButton);
    shelvesList.appendChild(shelfListItem);
  }
}

function updateShelf(shelfNumber) {
  const shelf = shelves.find(s => s.number === shelfNumber);
  shelf.stock = Math.min(shelf.stock + 5, 100);
  updateInventory();
}

function displayInventory() {
  const inventoryTable = document.getElementById("inventory");
  inventoryTable.innerHTML = "";
  const tableBody = document.createElement("tbody");
  // O(n) where n is the number of items in the inventory
  for (const item of inventory) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td><td>${item.initialStock}</td>
      <td>${item.currentStock}</td>
      <td>${item.shelfNumber}</td>
    `;
    tableBody.appendChild(row);
  }
  inventoryTable.appendChild(tableBody);
}

startGame();