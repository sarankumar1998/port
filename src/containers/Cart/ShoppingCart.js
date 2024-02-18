// ShoppingCart.js
import React from 'react';

const ShoppingCart = ({ cartItems, removeFromCart,calculateTotal }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price * item.quantity}</p>
          <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${calculateTotal(cartItems)}</h3>
    </div>
  );
};

export default ShoppingCart;