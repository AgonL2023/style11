// Header Scroll
let header = document.querySelector("header")

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
})
//Products Array
const products = [
    {
        id: 1,
        title: "Adidas Swetshirt | Size XL",
        price: 54.9,
        Image:
        "imgamiga/Adidas.png"
    },
    {
        id: 2,
        title: "Nike Swetshirt | Size M",
        price: 75.9,
        Image:
        "imgamiga/Nikeg.png"
    },
    {
        id: 3,
        title: "Puma Swetshirt | Size L",
        price: 65.9,
        Image:
        "imgamiga/Pumaa.png"
    },
    {
        id: 4,
        title: "Parit T-Shirt | Size S",
        price: 35,
        Image:
        "imgamiga/ParisT.png"
    },
    {
        id: 5,
        title: "Puma T-Shirt | Size L",
        price: 29.9,
        Image:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/673430/01/mod01/fnd/IND/fmt/png/PUMA-Logo-Men's-Slim-Fit-T-Shirt"
    },
    {
        id: 6,
        title: "USA T-Shirt | Size M",
        price: 22.9,
        Image:
        "imgamiga/USAA.png"
    },
    {
        id: 7,
        title: "Queen Hoodie | Size M",
        price: 45.9,
        Image:
        "imgamiga/Queen1.png"
    },
    {
        id: 8,
        title: "Nike Hoodie | Size XL",
        price: 74.9,
        Image:
        "imgamiga/nikeorg.png"
    },

];


// Get the products list and elements
const productList = document.getElementById('productList')
const cartItemsElement = document.getElementById('cartItems')
const cartTotalElement = document.getElementById('cartTotal')


//Store Cart Items In Local Storage
let cart =JSON.parse(localStorage.getItem('cart')) || [];

//Render Products On Page
function renderProducts(){
    productList.innerHTML = products.map(
        (product) => `
        <div class="product">
        <img src="${product.Image}" alt="${product.title}" class="product-img" />
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
        </div>
    </div>
        `
    )
    .join("");
    //Add to cart
    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (let i = 0; i < addToCartButtons.length; i++) {
        const addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener('click', addToCart);
    }
}

// Add to cart
function addToCart(event) {
    const productID = parseInt(event.target.dataset.id);
    const product = products.find((product) => product.id === productID);
    
    if(product){
        //if product already in cart
        const exixtingItem = cart.find((item) => item.id === productID);

        if(exixtingItem){
            exixtingItem.quantity++;
        }else{
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                Image: product.Image,
                quantity: 1,
            }
            cart.push(cartItem);
        }
        //Change Add to cart text to added
        event.target.textContent = "Added";
        updateCartIcon();
        saveToLocalStorage();
        renderCartItems();
        calculateCartTotal();
        
    }
}

//Remove from cart
function removeFromCart(event){
    const productID = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productID);
    saveToLocalStorage();
    renderCartItems();
    calculateCartTotal();
    updateCartIcon();
}
// Quantitu Change
function changeQuantity(event){
    const productID = parseInt(event.target.dataset.id);
    const quantity = parseInt(event.target.value);

    if(quantity > 0){
        const cartItem = cart.find((item) => item.id === productID);
        if(cartItem){
            cartItem.quantity = quantity;
            saveToLocalStorage();
            calculateCartTotal();
            updateCartIcon();
        }
    }
}
//SaveToLocalStorage
function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

//Render Products On Cart Page
function renderCartItems(){
    cartItemsElement.innerHTML = cart.map(
        (item) => `
        <div class="cart-item">
                <img src="${item.Image}" alt="${item.title}" />
                <div class="cart-item-info">
                    <h2 class="cart-item-title">${item.title}</h2>
                    <input 
                    class="cart-item-quantity" 
                    type="number" 
                    name="" 
                    min="1" 
                    value="${item.quantity}" 
                    data-id="${item.id}"
                    />
                </div>
                <h2 class="cart-item-price">$${item.price}</h2>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
        `
    )
    .join("");
    //Remove From Cart
    const removeButtons = document.getElementsByClassName('remove-from-cart');
    for (let i = 0; i < removeButtons.length; i++) {
        const removeButton = removeButtons[i];
        removeButton.addEventListener('click', removeFromCart);
    }
    //Quantity Change
    const quantityInputs = document.querySelectorAll('.cart-item-quantity');
    quantityInputs.forEach((input) => {
        input.addEventListener('change', changeQuantity);
    });
}

//Calculate Total
function calculateCartTotal(){
    const total = cart.reduce((sum, item) =>sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}




//Check If On Cart Page
if(window.location.pathname.includes("cart.html")) {
    renderCartItems();
    calculateCartTotal();
}else if(window.location.pathname.includes("success.html")){
clearCart();
}else{
    renderProducts();
}
// Empty Cart on successfull payment
function clearCart(){
    cart = [];
    saveToLocalStorage();
    updateCartIcon;
}
//Cart Icon Quantity
const cartIcon = document.getElementById('cart-icon')

function updateCartIcon(){
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity,0)
    cartIcon.setAttribute('data-quantity',totalQuantity)
}

updateCartIcon();

function updateCartIconOnCartChange(){
    updateCartIcon();
}

window.addEventListener('storage', updateCartIconOnCartChange);

function updateCartIcon() {
    const totalQuantity = cart.reduce((sum, item) => sum+ item.quantity,0)
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.setAttribute('data-quantity',totalQuantity);
}






renderProducts();
renderCartItems();
calculateCartTotal();