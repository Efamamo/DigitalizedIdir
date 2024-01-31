document.addEventListener('DOMContentLoaded', function () {
    const bookNowButtons = document.querySelectorAll('.to-cart .cart');
    const cartTable = document.querySelector('.cart-table');
    const totalElement = document.querySelector('.total');

    // Object to store items in the cart
    const cartItems = {};

    // Event listener for Book Now buttons
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the relevant data from the clicked card
            const card = this.closest('.card');
            const itemName = card.querySelector('.card-title').textContent;
            const quantity = parseInt(card.querySelector('#items-amout').value);
            const itemPrice = parseFloat(card.querySelector('.card-text').textContent.replace('$', ""));
            console.log()

            if (quantity > parseInt(card.querySelector('#items-amout').placeholder)){
                alert('The Amount you entered it Not available')
                return
            }

            if (!quantity | quantity<=0){
                alert('The Amount cant be less that 1')
                return
            }

            // Check if the item is already in the cart
            if (cartItems[itemName]) {
                // Item is already in the cart, set the new quantity and update the corresponding row
                cartItems[itemName].quantity = quantity;
                const existingRow = cartTable.querySelector(`tr[data-item="${itemName}"]`);
                existingRow.querySelector('td:nth-child(2)').innerHTML = `<input name="amount" style="border:none" type="text" value=${cartItems[itemName].quantity}>`;
                existingRow.querySelector('td:nth-child(3)').innerHTML = `<input name="price" style="border:none" type="text" value=${itemPrice * quantity} Birr>`;
            } else {
                // Item is not in the cart, add a new row
                const newRow = document.createElement('tr');
                newRow.setAttribute('data-item', itemName);
                newRow.innerHTML = `
                    <td> <input name="name" style="border:none" type="text" value=${itemName}></td>
                    <td><input name="amount" style="border:none" type="text" value=${quantity}></td>
                    <td><input name="price" style="border:none" type="text" value=${itemPrice * quantity} Birr> </td>
                    <td><img src="images/delete.png" class="delete"></td>
                `;

                // Append the new row to the cart table
                cartTable.appendChild(newRow);

                // Store the item in the cartItems object
                cartItems[itemName] = {
                    quantity: quantity,
                    price: itemPrice
                };
            }

            // Update the total amount
            document.querySelector(".cart").style.display = "block";
            document.querySelector(".rent").style.display = "block";
            updateTotal();
        });
    });

    // Event delegation for delete button clicks
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')) {
            const rowToDelete = event.target.closest('tr');
            const itemNameToDelete = rowToDelete.querySelector('td:first-child').textContent;

            // Remove the row from the table
            rowToDelete.remove();

            // Remove the item from the cartItems object
            delete cartItems[itemNameToDelete];

            // Update the total amount
            updateTotal();
        }
    });

    // Function to update the total amount
    function updateTotal() {
        let total = 0;
        for (const itemName in cartItems) {
            total += cartItems[itemName].quantity * cartItems[itemName].price;
        }
        document.querySelector('.total').innerHTML = `<input style="border:none" name="total" type="text" value=${total} Birr>`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const toggleSidebar = document.getElementById("toggleSidebar");
    console.log(toggleSidebar)
  
    toggleSidebar.addEventListener("click", function() {
      if (sidebar.style.right === "-250px") { /* Changed from left to right */
        sidebar.style.right = "0"; /* Changed from left to right */
      } else {
        sidebar.style.right = "-250px"; /* Changed from left to right */
      }
    });
  });
