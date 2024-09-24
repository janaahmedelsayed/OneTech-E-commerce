const cartList = document.querySelector(".cartlist");
const totalPriceEle = document.querySelector(".total-price");
const payBtn = document.querySelector(".payBtn");
const noCart = document.querySelector(".nocart");
const acceptPay = document.querySelector(".acceptPay");

let cart = JSON.parse(localStorage.getItem("CartArray")) || [];
let totalPrice = 0;
let inputsCount = [];
let btnsEdit = [];

// Initial setup to show/hide cart based on items
if (cart.length < 1) {
  resetCartDisplay();
} else {
  displayCart();
}

// Function to display cart items and total price
function displayCart() {
  let box = "";
  totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    box += `
      <li class="row justify-content-between py-3 align-items-center border-1 border-bottom">
        <div class="item-details d-flex gap-4 flex-column flex-md-row align-items-center col-4 text-center text-md-start">
          <div class="img-cart-container">
            <img src="${cart[i].imgSrc}" alt="${cart[i].name}" />
          </div>
          <div class="item-text-info">
            <h5>${cart[i].name}</h5>
            <p class="text-secondary">cat</p>
          </div>
        </div>
        <div class="col-2">${cart[i].price}</div>
        <div class="col-3 d-flex flex-column flex-md-row align-items-center text-center text-md-start">
           <input type="number" class="form-control inputCount text-center w-100" min="0" max="10" value="${cart[i].count}" disabled />

          <button class="btn btn-warning crudBtn editBtn" onClick="editItem(${i})">Edit</button>
          <button class="btn btn-danger crudBtn deleBtn" onClick="deleItem(${i})"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="col-2 text-center text-md-start">$${
          cart[i].price.substring(1) * cart[i].count
        }</div>
      </li>
    `;
    totalPrice += cart[i].price.substring(1) * cart[i].count;
  }

  cartList.innerHTML = box;
  totalPriceEle.innerHTML = `Total Price Is : <b class="text-success">${totalPrice.toFixed(2)} $</b>`;
}

// Function to delete item from cart
function deleItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("CartArray", JSON.stringify(cart));
  displayCart();
  
  if (cart.length < 1) {
    resetCart();
  }
}

function editItem(i) {
  const inputsCount = Array.from(document.querySelectorAll(".inputCount"));
  const btnsEdit = Array.from(document.querySelectorAll(".editBtn"));

  inputsCount[i].removeAttribute("disabled");
  inputsCount[i].setAttribute("min", "0"); // Set minimum to 0
  inputsCount[i].setAttribute("max", "10"); // Set maximum to 10
  btnsEdit[i].innerHTML = "Done";
  btnsEdit[i].classList.replace("btn-warning", "btn-success");
  inputsCount[i].focus();

  inputsCount[i].addEventListener("blur", () => {
    let newCount = +inputsCount[i].value;

    // Enforce the value to be within the range 0 to 10
    if (newCount < 0) {
      inputsCount[i].value = 0; // If value is below 0, reset to 0
    } else if (newCount > 10) {
      inputsCount[i].value = 10; // If value is above 10, reset to 10
    }

    newCount = +inputsCount[i].value; // Recheck the corrected value

    if (newCount === 0 && cart.length > 1) {
      deleItem(i);
    } else if (newCount === 0 && cart.length === 1) {
      resetCart();
    } else {
      cart[i].count = newCount;
      localStorage.setItem("CartArray", JSON.stringify(cart));
      inputsCount[i].setAttribute("disabled", "");
      btnsEdit[i].innerHTML = "Edit";
      btnsEdit[i].classList.replace("btn-success", "btn-warning");
      displayCart();
    }
  });
}

// Reset cart when it's empty
function resetCart() {
  cart = [];
  localStorage.setItem("CartArray", JSON.stringify(cart));
  resetCartDisplay();
}

// Reset cart display
function resetCartDisplay() {
  cartList.innerHTML = "";
  totalPriceEle.innerHTML = "Total Price Is : <b class='text-danger'>0 $</b>";
  payBtn.classList.add("d-none");
  noCart.classList.remove("d-none");
}

// Payment acceptance logic
acceptPay.addEventListener("click", () => {
  alert("Payment Done!");
  resetCart();
});
