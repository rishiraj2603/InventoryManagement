import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../store/cartSlice";
import { updateStock } from "../store/productSlice";

function ProductList() {
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  function addToCartHandler(product) {
    if (product.stock > 0) {
      dispatch(addToCart(product));
      dispatch(updateStock({ productId: product.id, quantity: 1 }));
    }
  }

  function increase(product, quantity) {
    if (product.stock > 0) {
      dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
      dispatch(updateStock({ productId: product.id, quantity: 1 }));
    }
  }

  function decrease(product, quantity) {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    }
    dispatch(updateStock({ productId: product.id, quantity: -1 }));
  }

  function getQuantity(productId) {
    let item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => {
        let quantity = getQuantity(product.id);
        let inCart = quantity > 0;

        return (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <p
              className={product.stock === 0 ? "text-red-500" : "text-gray-500"}
            >
              {product.stock === 0 ? "Out of Stock" : "Stock: " + product.stock}
            </p>

            {inCart ? (
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => decrease(product, quantity)}
                  className="bg-blue-500 text-white w-8 h-8 rounded-full"
                >
                  -
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  onClick={() => increase(product, quantity)}
                  disabled={product.stock === 0}
                  className="bg-blue-500 text-white w-8 h-8 rounded-full disabled:bg-gray-400"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCartHandler(product)}
                disabled={product.stock === 0}
                className="w-full mt-4 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
