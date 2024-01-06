// Set to store selected item IDs

var selectedItems = new Set();


// Function to update UI based on selected items

function updateUI() {
    const cart = document.getElementById('cart');
    const itemCatalog = document.getElementById('item-catalog');

    if (selectedItems.size === 0) {
        cart.classList.add('d-none');
        // itemCatalog.classList.remove('col-md-9');
        // itemCatalog.classList.add('col-md-9');
    } else {
        cart.classList.remove('d-none');
        // itemCatalog.classList.remove('col-md-9');
        // itemCatalog.classList.add('col-md-9');
    }
}


// Event listeners for "Add to Cart" buttons



const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    console.log(button)
    button.addEventListener('click', event => {
        const targetElement = event.target.parentElement.parentElement;

        if (selectedItems.has(targetElement.id)) {

            // If item already in cart, notify the user
            alert('This item is already added to the cart.');

        } else {

            // Add item to the cart and update UI
            selectedItems.add(targetElement.id);
            targetElement.querySelector('button').textContent = 'Added';

            updateUI();

            // Display item in the cart
            const cartBody = document.querySelector('#cart-table tbody');
            const itemTitle = targetElement.querySelector('.card-title').textContent;
            const tr = document.createElement('tr');
            const td = document.createElement('td')
            td.textContent = itemTitle;
            tr.appendChild(td)

            //Day duration form
            const inputCell = document.createElement('td');
            const borrowalDuration = document.createElement('input');
            inputCell.appendChild(borrowalDuration);
            borrowalDuration.placeholder = 'eg. 3';
            borrowalDuration.type = 'text';
            borrowalDuration.classList.add('pt-2', 'pb-2', 'mt-2')
            tr.appendChild(inputCell);

            const tdRemoveButton = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add(...['btn', 'btn-danger', 'ms-3', 'mt-3']);
            removeButton.addEventListener('click', () => {

                // Remove item from cart and update UI
                selectedItems.delete(targetElement.id);
                cartBody.removeChild(tr);
                targetElement.querySelector('button').textContent = 'Add To Cart';
                updateUI();

                // Update the "Add to Cart" button status
                button.disabled = false;
            });

           
            // Logic for borrowing an item
            tdRemoveButton.appendChild(removeButton);
            tr.appendChild(tdRemoveButton);
            cartBody.appendChild(tr);

            // Disable the "Add to Cart" button
            button.disabled = true;
        }
    });
});

// General borrow method
const borrowButton = document.getElementById('borrow-btn');
borrowButton.addEventListener('click', () => {
    // Logic for borrowing items from the cart
});
