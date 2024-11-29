export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantitay: 2,
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantitay:1
}
];

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