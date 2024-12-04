import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdeliveryOptions } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

export function renderPayementSummary(){
    let productPricecents =0;
    let shippingPricecents = 0;

    cart.forEach(element => {
        const product = getProduct(element.productId);
        productPricecents += product.priceCents * element.quantitay;

        const deliveryOption =  getdeliveryOptions(element.deliveryOptionId);
        shippingPricecents += deliveryOption.priceCents;
    });
    const TotalBeforeTaxcents = productPricecents + shippingPricecents;
    const Taxcents = (TotalBeforeTaxcents * 0.1);
    const Totalcents = TotalBeforeTaxcents + Taxcents;    
    
    const PaymentSummaryHtml = 
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPricecents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPricecents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(TotalBeforeTaxcents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(Taxcents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(Totalcents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    
    `
    document.querySelector('.js-payment-summary').innerHTML = PaymentSummaryHtml;
}