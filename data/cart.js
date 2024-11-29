export const cart = [];

export function addTocart(productId){
    let matchingcartItem;
    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingcartItem = cartItem;
      }
    });
    let quantitaySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    
    const quantitay = Number(quantitaySelector.value);
    if(matchingcartItem){
      matchingcartItem.quantitay += quantitay;
    }else{
      cart.push({
        productId: productId,
        quantitay:quantitay
      });
    }
  }