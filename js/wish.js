// wish items //
const wishList = document.querySelector(".Wishlist");
const clearBtn = document.querySelector(".clearBtn");
const noWish = document.querySelector(".no-wish");
const acceptUnFavAll = document.querySelector(".acceptUnFavAll");
let wish = JSON.parse(localStorage.getItem("WishArray")) || [];

// Initial setup to show/hide wishlist based on items
if (wish.length < 1) {
  clearBtn.classList.add("d-none");
  noWish.classList.remove("d-none");
} else {
  displayWish();
  noWish.classList.add("d-none");
  clearBtn.classList.remove("d-none");
}

// Function to display wishlist items
function displayWish() {
  let box = "";

  for (let i = 0; i < wish.length; i++) {
    box += `
      <li class="row justify-content-between py-3 align-items-center border-1 border-bottom">
        <div class="item-details d-flex gap-4 flex-column flex-md-row align-items-center text-center text-md-start col-4">
          <div class="img-cart-container">
            <img src="${wish[i].imgSrc}" alt="${wish[i].name}" />
          </div>
          <div class="item-text-info">
            <h5>${wish[i].name}</h5>
            <p class="text-secondary">cat</p>
          </div>
        </div>
        <div class="col-3 text-center text-md-start">${wish[i].price}</div>
        <div class="col-2 d-flex flex-column flex-md-row align-items-center text-center text-md-start">
          <button class="btn btn-danger crudBtn deleBtn" onClick="deleItemWish(${i})"><i class="fa-solid fa-heart-crack"></i></button>
        </div>
      </li>
    `;
  }

  Wishlist.innerHTML = box;
}

// Function to delete an item from the wishlist
function deleItemWish(i) {
  wish.splice(i, 1); // Remove item from wishlist
  localStorage.setItem("WishArray", JSON.stringify(wish)); // Update localStorage

  displayWish(); // Refresh display

  // If wishlist becomes empty, clear everything
  if (wish.length < 1) {
    clearWish();
  }
}

// Function to clear the entire wishlist
function clearWish() {
  wish = []; // Empty wishlist array
  localStorage.setItem("WishArray", JSON.stringify(wish)); // Update localStorage
  clearBtn.classList.add("d-none"); // Hide clear button
  noWish.classList.remove("d-none"); // Show 'no wishlist' message
  wishList.innerHTML = ""; // Clear the wishlist display
}

// Event listener to clear all wishlist items
acceptUnFavAll.addEventListener("click", () => {
  alert("Clear Done");
  clearWish(); // Clear the wishlist
});
