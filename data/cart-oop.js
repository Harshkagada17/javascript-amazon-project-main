function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,

        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if(!this.cartItems){
                this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantitay: 2,
                deliveryOptionId: '1'
                },{
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantitay:1,
                deliveryOptionId: '2'
                }
                
            ]};
            
        },
        saveToStorage(){
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
        },
        addToCart(productId){
            let matchingcartItem;
            this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingcartItem = cartItem;
            }
            });
            let quantitaySelector = document.querySelector(`.js-quantity-selector-${productId}`);
            
            const quantitay = Number(quantitaySelector.value);
            if(matchingcartItem){
            matchingcartItem.quantitay += quantitay;
            }else{
            this.cartItems.push({
                productId: productId,
                quantitay:quantitay,
                deliveryOptionId: '1'
            });
            }
            this.saveToStorage();
        },
        removefromCart(productId){
            const newCart = [];
        
            this.cartItems.forEach((cartItem) =>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
            });
            this.cartItems = newCart;
        
            this.saveToStorage();
        },
        calculateCartQuantity(){
            let cartQuantity = 0;
        
            this.cartItems.forEach((cartItem) =>{
                cartQuantity += cartItem.quantitay;
            });
            return cartQuantity;
        },
        updateQuantity(productId, newNumberInput) {
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
            });
        
            matchingItem.quantitay = newNumberInput;
        
            this.saveToStorage();
        },
        updateDeliveryCart(productId,deliveryOptionId){
            let matchingcartItem;
            this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingcartItem = cartItem;
            }
            });
            matchingcartItem.deliveryOptionId = deliveryOptionId;
        
            this.saveToStorage();
        }
    };
    return cart;
}
const cart = Cart('cart-oop');
const bussinessCart = Cart('cart-business');
cart.loadFromStorage();   
bussinessCart.loadFromStorage();

console.log(cart);
console.log(bussinessCart);


  
  