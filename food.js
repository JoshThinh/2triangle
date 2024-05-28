const ROWS = 5;
const COLUMNS = 5;
const SECONDS = 60;

const foodItems = [
    { name: 'Apple', price: 1.5 },
    { name: 'Banana', price: 0.75 },
    { name: 'Carrot', price: 0.5 },
    { name: 'Tomato', price: 0.8 },
    { name: 'Bread', price: 2.0 },
    { name: 'Milk', price: 3.0 },
    { name: 'Cheese', price: 4.0 },
    { name: 'Egg', price: 0.25 },
    { name: 'Fish', price: 5.0 },
    { name: 'Chicken', price: 4.5 }
];


const sections = {
    'Fruits': ['Apple', 'Banana'],
    'Vegetables': ['Carrot', 'Tomato'],
    'Dairy': ['Milk', 'Cheese'],
    'Protein': ['Egg', 'Fish', 'Chicken'],
    'Bakery': ['Bread']
};

let pantry = [];
let score = 0;
let price = 0;
let timeLeft = SECONDS;
let timerInterval;

// Initialize the pantry with random food items
function initializePantry() {
    for (let i = 0; i < ROWS; i++) {
        const row = [];
        for (let j = 0; j < COLUMNS; j++) {
            const item = foodItems[Math.floor(Math.random() * foodItems.length)];
            row.push(item);
        }
        pantry.push(row);
    }
}

// Render the pantry grid
function renderPantry() {
    const pantryDiv = document.getElementById('pantry');
    pantryDiv.innerHTML = '';

    pantry.forEach((row, i) => {
        row.forEach((item, j) => {
            if (item) {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'food-item';

                // Display item name
                const nameDiv = document.createElement('div');
                nameDiv.className = 'name'; // Add name class
                nameDiv.innerText = item.name;
                foodDiv.appendChild(nameDiv);

                // Display item price
                const priceDiv = document.createElement('div');
                priceDiv.className = 'price'; // Add price class
                priceDiv.innerText = `$${item.price.toFixed(2)}`;
                foodDiv.appendChild(priceDiv);

                // Set dataset attributes
                foodDiv.dataset.item = item.name;
                foodDiv.dataset.row = i;
                foodDiv.dataset.column = j;

                foodDiv.draggable = true;
                foodDiv.addEventListener('dragstart', onDragStart);
                foodDiv.addEventListener('dragend', onDragEnd);

                pantryDiv.appendChild(foodDiv);
            }
        });
    });
}

// Handle drag start event
function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.item);
    event.target.style.opacity = '0.4';
}

// Handle drag end event
function onDragEnd(event) {
    event.target.style.opacity = '1';
}

// Handle drop event on sections
function onDrop(event) {
    event.preventDefault();
    const itemName = event.dataTransfer.getData('text/plain');
    const item = foodItems.find(food => food.name === itemName);
    const section = event.target.dataset.section;

    console.log("Item:", item); // Log the item object

    if (item && sections[section].includes(itemName)) {
        score++;
        updateScore();
        removeItemFromPantry(itemName);
        addItemToDropdown(section, item); // Pass item.name instead of item
        displayPrice(item.price); // Pass item.price instead of price
        renderPantry();
    } else {
        console.log("Item not found or not in section.");
    }
}


// Allow drop event
function onDragOver(event) {
    event.preventDefault();
}

// Update the score display
function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Update the score display
function displayPrice(newprice) {
    price +=newprice;
    document.getElementById('price').innerText = `Price: ${price}`;
}

// Remove item from pantry
function removeItemFromPantry(item) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (pantry[i][j] === item) {
                pantry[i][j] = null;
                return;
            }
        }
    }
}

// Add item to the dropdown menu
function addItemToDropdown(section, item) {
    const dropdownId = `${section.toLowerCase()}-dropdown`;
    const dropdown = document.getElementById(dropdownId);
    const option = document.createElement('option');
    option.value = "$"+item.price+" "+item.name;
    option.innerText =  "$"+item.price+" "+item.name;
    dropdown.appendChild(option);
    sortOptions(dropdown)

}

function sortOptions(dropdown) {
    const options = Array.from(dropdown.options);

    options.sort((a, b) => {
        if (a.text > b.text) return -1;
        if (a.text < b.text) return 1;
        return 0;
    });

    // Remove existing options
    dropdown.innerHTML = '';

    // Add sorted options back to the select element
    options.forEach(option => dropdown.add(option));
}

// Update the timer display and handle timer end
function updateTimer() {
    timeLeft--;
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert(`Time's up! Your final Price is: ${price}`);
        postfoodscore();
    }
}

// Auto-sort the pantry using a basic matching algorithm
function autoSortPantry() {
    pantry.forEach((row, i) => {
        row.forEach((item, j) => {
            if (item) {
                for (const section in sections) {
                    if (sections[section].includes(item)) {
                        score++;
                        addItemToDropdown(section, item);
                        pantry[i][j] = null;
                        break;
                    }
                }
            }
        });
    });

    renderPantry();
}

// Initialize the game
function initializeGame() {
    initializePantry();
    renderPantry();

    document.querySelectorAll('.section').forEach(section => {
        section.addEventListener('dragover', onDragOver);
        section.addEventListener('drop', onDrop);
    });

    timerInterval = setInterval(updateTimer, 1000);
}




// Start the game
window.onload = initializeGame;
