import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [
      {
        id: 1,
        name: "Laptop",
        price: 999.99,
        stock: 10,
        description: "High-performance laptop",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        name: "Smartphone",
        price: 499.99,
        stock: 15,
        description: "Latest model smartphone",
        image:
          "https://images.unsplash.com/photo-1494366222322-387658a1a976?q=80&w=2462&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        name: "Headphones",
        price: 99.99,
        stock: 20,
        description: "Wireless noise-canceling headphones",
        image:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        name: "Tablet",
        price: 299.99,
        stock: 8,
        description: "Lightweight tablet with stylus",
        image:
          "https://images.unsplash.com/photo-1527698266440-12104e498b76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFibGV0fGVufDB8fDB8fHww",
      },
    ],
  },
  reducers: {
    updateStock: (state, action) => {
      let product = state.products.find(
        (p) => p.id === action.payload.productId
      );
      if (product) {
        product.stock = Math.max(0, product.stock - action.payload.quantity);
      }
    },
  },
});

export const { updateStock } = productSlice.actions;
export default productSlice.reducer;
