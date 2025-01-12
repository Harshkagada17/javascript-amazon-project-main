import {cart,addTocart,calculateCartQuantity} from '../data/cart.js'; 
import {products} from '../data/products.js'; 
let ProductHtml = '';
products.forEach((products) => {
    ProductHtml  += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${products.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${products.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${products.extraInfoHTML()}
          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${products.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>
    `;

});

function updatecartQuantity(productId){
  let addMessageTimeoutId;
  
  let cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;  

  const addMessage = document.querySelector(`.js-added-to-cart-${productId}`);

  addMessage.classList.add('added-to-cart-visible');

  if(addMessageTimeoutId){
    clearTimeout(addMessageTimeoutId);
  }

  const timeoutid =  setTimeout(() =>{
    addMessage.classList.remove('added-to-cart-visible');
  }, 2000);

  addMessageTimeoutId = timeoutid;
}

document.querySelector('.js-products-grid').innerHTML = ProductHtml;
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
    button.addEventListener('click', () =>{
    const productId = button.dataset.productId;
    addTocart(productId);
    updatecartQuantity(productId);    
    });

  });

  