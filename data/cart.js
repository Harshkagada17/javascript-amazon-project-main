export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantitay: 2,
    deliveryOptionId: '1'
  },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantitay:1,
    deliveryOptionId: '2'
  }
  ];
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

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
        quantitay:quantitay,
        deliveryOptionId: '1'
      });
    }
    saveToStorage();
  }
  export function removefromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) =>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    cart = newCart;

    saveToStorage();
  }
  export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem) =>{
        cartQuantity += cartItem.quantitay;
    });
    return cartQuantity;
  }

  export function updateQuantity(productId, newNumberInput) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newNumberInput;
  
    saveToStorage();
  }