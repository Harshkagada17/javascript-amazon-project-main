import { cart } from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { removefromCart } from "../../data/cart.js";
import { calculateCartQuantity, updateQuantity } from "../../data/cart.js";
import { deliveryOptions, getdeliveryOptions } from "../../data/deliveryOptions.js";
import { updateDeliveryCart } from "../../data/cart.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs/+esm';
import { renderPayementSummary } from "./payemtoption.js";

export function renderOrderSummary(){

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct = getProduct(productId);

        if (matchingProduct) {

            const deliveryOptionId = cartItem.deliveryOptionId;

            let deliveryOption = getdeliveryOptions(deliveryOptionId);

            
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,'days');
            const dataString = deliveryDate.format('dddd, MMMM D');

            

            cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dataString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${(matchingProduct.getPrice())}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantitay}
                    </span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link "data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
            
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
            
            </div>
            </div>
        </div>
        `;
        }
    });
    function deliveryOptionsHTML(matchingProduct,cartItem){
        let html = '';

        deliveryOptions.forEach((deliveryOption) =>{
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,'days');
            const dataString = deliveryDate.format('dddd, MMMM D');
            const priceString =  deliveryOption.priceCents === 0 ? 'FREE': `$${formatCurrency(deliveryOption.priceCents)} `;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId; 
        html += `
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}" 
                data-delivery-option-id = "${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dataString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} - Shipping
                        </div>
                    </div>
                </div>
            `
        });
        return html;
    }
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener("click",()=>{
            const productId = link.dataset.productId;
            removefromCart(productId);

            const container =  document.querySelector(`.js-cart-item-container-${productId}`);

            container.remove();

            renderPayementSummary();


            updatecartQuantity();
            });
    });
    function updatecartQuantity(){
        const cartQuantity = calculateCartQuantity();
        document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
    }
    document.querySelectorAll('.js-update-link').forEach((link)=>{
        link.addEventListener("click",()=>{
            const productId = link.dataset.productId;
            console.log(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');

            updatecartQuantity();
        });
    });
    document.querySelectorAll('.js-save-link').forEach((item)=>{
        item.addEventListener("click",()=>{
            const productId = item.dataset.productId;
            console.log(productId);

            

            const numberInput = document.querySelector(`.js-quantity-input-${productId}`);

            const newNumberInput = Number(numberInput.value);

            if(newNumberInput < 0 || newNumberInput >= 1000){
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }

            updateQuantity(productId,newNumberInput);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity');

            const quantityLabel = document.querySelector(
                `.js-quantity-label-${productId}`
            );
            quantityLabel.innerHTML = newNumberInput;
        
            updatecartQuantity();
            
        });
    });
    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener("click",()=>{
            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;
            updateDeliveryCart(productId,deliveryOptionId);
            renderOrderSummary();
            renderPayementSummary();
        });
    });
}

