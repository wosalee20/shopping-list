
// Initialize the 'items' array from local storage or create an empty array if it doesn't exist
const items = JSON.parse(localStorage.getItem('items')) || [];





// Function to save the 'items' array to local storage
function saveItemsToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

// Function to add an item to the list
function addItem() {
    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);

    if (itemName && !isNaN(itemPrice)) {
        // Create a new item object
        const item = {
            name: itemName,
            price: itemPrice,
        };
        // Add item to the array
        items.push(item);

        // Clear the input fields
        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";

        // Update the item list
        updateItemList();
        // Calculate and update the total cost
        calculateTotalCost();

        // Save the 'items' array to local storage
        saveItemsToLocalStorage();
    }
}

// Function to update the item list
function updateItemList() {
    const itemList = document.getElementById('itemList');

    // Clear the list
    itemList.innerHTML = "";

    // Add items to the list
    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name}: &#8358; ${item.price.toFixed(2)} 
        <button onclick="editItem(${index})" class="add-item-btn">Edit</button>
        <button onclick="deleteItem(${index})" class="add-item-btn">Delete</button>
        `;
        itemList.appendChild(listItem);
    });

    // Save the 'items' array to local storage
    saveItemsToLocalStorage();
}

// Function to edit an item
function editItem(index) {
    const newItemName = prompt("Edit the item name:", items[index].name);

    // Check if the user canceled or left the input empty
    if (newItemName !== null && newItemName !== "") {
        const newItemPrice = parseFloat(prompt("Edit the item price:", items[index].price));

        if (!isNaN(newItemPrice)) {
            // Update item in the array
            items[index].name = newItemName;
            items[index].price = newItemPrice;

            // Update the list and total cost
            updateItemList();
            calculateTotalCost();

            // Save the 'items' array to local storage
            saveItemsToLocalStorage();
        }
    }
}

// Function to delete an item
function deleteItem(index) {
    // Remove the item from the array
    items.splice(index, 1);
    // Update item list and total cost
    updateItemList();
    calculateTotalCost();

    // Save the 'items' array to local storage
    saveItemsToLocalStorage();
}

// Function to calculate and update the total cost
function calculateTotalCost() {
    const totalCost = items.reduce((total, item) => total + item.price, 0);
    const costValue = document.getElementById('costValue');
    costValue.textContent = totalCost.toFixed(2);

    // Save the 'items' array to local storage
    saveItemsToLocalStorage();
}

// Function to generate and save PDF
function saveAsPDF() {
    // Create a new JsPDF instance
    const doc = jsPDF();

    // Set the title for the PDF document
    doc.text("Shopping List", 10, 10);

    // Initialize the vertical position for adding content
    let yPos = 30;

    // Loop through the items and add them to the PDF
    items.forEach(item => {
        doc.text(`${item.name}: ₦${item.price.toFixed(2)}`, 10, yPos);
        yPos += 10;
    });

    // Calculate and add the total cost
    const totalCost = items.reduce((total, item) => total + item.price, 0);
    yPos += 10;
    doc.text(`Total Cost: ₦${totalCost.toFixed(2)}`, 10, yPos);

    // Save the PDF with a specific name
    doc.save("Shopping_list.pdf");
}