



// counter

function startCountdown(duration, display) {
  let timer = duration, hours, minutes, seconds;

  const countdownInterval = setInterval(function () {
      hours = Math.floor(timer / 3600);
      minutes = Math.floor((timer % 3600) / 60);
      seconds = timer % 60;

      // Add leading zeros
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = `${hours}:${minutes}:${seconds}`;

      if (--timer < 0) {
          clearInterval(countdownInterval);
          display.textContent = "Offer ended"; // Once time is up
      }
  }, 1000);
}

window.onload = function () {
  const countdownElement = document.getElementById('countdown');
  const countdownTime = 24 * 60 * 60; // 24 hours in seconds
  startCountdown(countdownTime, countdownElement);
};

// infinity bar

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.trend').length - 1; // Excluding the cloned card

function showSlide(index) {
    const slides = document.querySelectorAll('.trend');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    // Reset to the first slide if currentSlide exceeds the last slide
    if (index > totalSlides) {
        currentSlide = 1; // Skip to the first card (original)
        document.querySelector('.trend-flex').style.transition = 'none'; // Disable transition
        document.querySelector('.trend-flex').style.transform = `translateX(-100%)`;
        setTimeout(() => {
            document.querySelector('.trend-flex').style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
            showSlide(currentSlide); // Show the first card
        }, 20); // Small timeout to allow re-enabling the transition
        return;
    }

    // Set the current slide index
    currentSlide = index;

    const offset = -currentSlide * 5; // Move the container
    document.querySelector('.trend-flex').style.transform = `translateX(${offset}%)`;

    // Enable/disable buttons
    prevBtn.disabled = currentSlide === 0;
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Initialize the slider
showSlide(currentSlide);


function tabingChange(Section) {
  let btnsArray = Array.from(
    document.querySelectorAll(`${Section} .tabs button`)
  );
  let superArray = Array.from(
    document.querySelectorAll(`${Section} .items-list`)
  );
  var i = 0;
  btnsArray.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btnsArray.forEach((b) => {
        b.setAttribute("data-show", "false");
      });
      i = btnsArray.indexOf(btn);
      superArray.forEach((arr) => {
        arr.classList.replace("d-flex", "d-none");
      });
      e.target.setAttribute("data-show", "true");
      superArray[i].classList.replace("d-none", "d-flex");
    });
  });
}
tabingChange("#deals");
tabingChange("#newarrival");


// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  const numWish = document.querySelector(".num-wish");
  const numCart = document.querySelector(".num-cart");
  let addBtns = document.querySelectorAll(".btn-add");
  let favBtns = document.querySelectorAll(".wish");
  const cart = JSON.parse(localStorage.getItem("CartArray")) || [];
  const wish = JSON.parse(localStorage.getItem("WishArray")) || [];

  // Handle Cart Button
  addBtns.forEach((btn, ind) => {
    btn.addEventListener("click", (e) => {
      let cartIndex = cart.findIndex((obj) => obj.id === ind);

      if (cartIndex === -1) {
        // Item not in cart, add it
        let item = {
          id: ind,
          name: `${e.target.parentElement.children[1].children[2].children[0].innerHTML}`,
          price: `${e.target.parentElement.children[1].children[0].innerHTML}`,
          cat: `${e.target.parentElement.children[1].children[1].innerHTML}`,
          count: 1,
          imgSrc: `${e.target.parentElement.children[0].children[0].getAttribute(
            "src"
          )}`,
        };

        cart.push(item);
        localStorage.setItem("CartArray", JSON.stringify(cart));
        e.target.classList.add("btn-remove");
        e.target.innerHTML = "Remove Cart";
        displayCart();
      } else {
        // Item is already in cart, remove it
        cart.splice(cartIndex, 1);
        localStorage.setItem("CartArray", JSON.stringify(cart));
        e.target.classList.remove("btn-remove");
        e.target.innerHTML = "Add Cart";
        displayCart();
      }
    });
  });

  // Update the cart button state on page load
  addBtns.forEach((btn, ind) => {
    if (cart.find((obj) => obj.id === ind)) {
      btn.classList.add("btn-remove");
      btn.innerHTML = "Remove Cart";
    }
  });

  // Cart display logic
  function displayCart() {
    let totalPrice = 0;
    numCart.innerHTML = cart.length;

    cart.forEach((item) => {
      // Remove currency symbol and convert price to number for calculation
      totalPrice += parseFloat(item.price.substring(1)) * item.count;
    });

    let totalPriceText = document.querySelector(".total-price");
    if (totalPriceText) {
      totalPriceText.innerHTML = "$ " + totalPrice.toFixed(2);
    } else {
      console.error("Element with class .total-price not found");
    }
  }

  displayCart();

  // Wish List logic
  favBtns.forEach((btn, ind) => {
    btn.addEventListener("click", (e) => {
      let wishIndex = wish.findIndex((obj) => obj.id === ind);

      if (wishIndex === -1) {
        // Item not in wish list, add it
        let item = {
          id: ind,
          name: `${e.target.parentElement.parentElement.children[4].children[0].innerHTML}`,
          price: `${e.target.parentElement.parentElement.children[4].children[1].innerHTML}`,
          cat: `${e.target.parentElement.parentElement.children[3].innerHTML}`,
          imgSrc: `${e.target.parentElement.parentElement.children[2].getAttribute(
            "src"
          )}`,
        };

        wish.push(item);
        localStorage.setItem("WishArray", JSON.stringify(wish));
        e.target.parentElement.classList.add("wish-remove");
        e.target.parentElement.innerHTML =
          "<i class='fa-solid fa-heart-crack'></i>";
        displayWish();
      } else {
        // Item is already in wish list, remove it
        wish.splice(wishIndex, 1);
        localStorage.setItem("WishArray", JSON.stringify(wish));
        e.target.parentElement.classList.remove("wish-remove");
        e.target.parentElement.innerHTML = "<i class='fa-solid fa-heart'></i>";
        displayWish();
      }
    });
  });

  // Update the wish list button state on page load
  favBtns.forEach((btn, ind) => {
    if (wish.find((obj) => obj.id === ind)) {
      btn.classList.add("wish-remove");
      btn.innerHTML = "<i class='fa-solid fa-heart-crack'></i>";
    }
  });

  function displayWish() {
    numWish.innerHTML = wish.length;
  }

  displayWish();
});







































 



