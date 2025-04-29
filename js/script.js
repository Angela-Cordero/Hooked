const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

cartIcon.addEventListener("click", () => cart.classList.add("active"));

closeCart.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productBox = event.target.closest(".product-box");

    addToCart(productBox);
  });
});

const cartContent = document.querySelector(".cart-content");

const addToCart = (productBox) => {
  const productImg = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-title").textContent;
  const productPrice = productBox.querySelector(".price").textContent;

  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems) {
    if (item.textContent === productTitle) {
      alert("Oops! this is already in your cart.");
      return;
    }
  }
  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
  <img src="${productImg}" class="cart-img" alt=""/>
      <div class="cart-detail">
        <h2 class="cart-product-title">${productTitle}</h2>
        <span class="cart-price">${productPrice}</span>
          <div class="cart-quantity">
              <button id="decrement">-</button>
              <span class="number">1</span>
              <button id="increment">+</button>
            </div>
        </div>
      <i class="ri-delete-bin-line remove-cart"></i>`;

  cartContent.appendChild(cartBox);

  cartBox.querySelector(".remove-cart").addEventListener("click", () => {
    cartBox.remove();

    updateCartCount(-1);

    updateTotalPrice();
  });

  cartBox.querySelector(".cart-quantity").addEventListener("click", (event) => {
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector("#decrement");
    let quantity = numberElement.textContent;

    if (event.target.id === "decrement" && quantity > 1) {
      quantity--;
      if (quantity === 1) {
        decrementButton.style.color = "#4a200c";
      }
    } else if (event.target.id === "increment") {
      quantity++;
      decrementButton.style.color = " #e1cea5";
    }

    numberElement.textContent = quantity;

    updateTotalPrice();
  });

  updateCartCount(1);

  updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes = cartContent.querySelectorAll(".cart-box");

  let total = 0;

  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector(".cart-price");
    const price = priceElement.textContent.replace("$", "");

    const quantityElement = cartBox.querySelector(".number");
    const quantity = quantityElement.textContent;

    total += price * quantity;
  });
  totalPriceElement.textContent = `$${total}`;
};

let cartItemCount = 0;
const updateCartCount = (amount) => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += amount;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};

const buyButton = document.querySelector(".btn-buy");
buyButton.addEventListener("click", () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0) {
    alert("Sorry, your cart is empty.");
    return;
  }

  cartBoxes.forEach((cartBox) => cartBox.remove());
  cartItemCount = 0;

  updateTotalPrice();
  alert("Thank you for your purchase!");

  updateCartCount();
});
