const shippingCost = 10;
const cart = [];
const addToCart = function (product, quantity) {
  cart.push({ product: product, quantity: quantity });
  console.log(`${product} added to cart`);
};

export default addToCart;
