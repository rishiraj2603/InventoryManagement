import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { updateStock } from "../store/productSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  function removeItem(item) {
    dispatch(removeFromCart(item.id));
    dispatch(
      updateStock({
        productId: item.id,
        quantity: -item.quantity,
      })
    );
  }

  function changeQuantity(item, newQuantity) {
    let product = products.find((p) => p.id === item.id);
    let maxStock = product ? product.stock + item.quantity : 0;

    if (newQuantity > maxStock) {
      alert("Not enough stock!");
      return;
    }
    if (newQuantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    let diff = item.quantity - newQuantity;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    dispatch(
      updateStock({
        productId: item.id,
        quantity: -diff,
      })
    );
  }

  function checkout() {
    alert("Order placed! Total: $" + total.toFixed(2));
    cartItems.forEach((item) => {
      removeItem(item);
    });
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-4">
            <div className="flex space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => changeQuantity(item, parseInt(e.target.value))}
                className="w-16 p-1 border rounded"
              />
              <button onClick={() => removeItem(item)} className="text-red-500">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button
          onClick={checkout}
          className="w-full bg-green-500 text-white p-2 rounded mt-4"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
