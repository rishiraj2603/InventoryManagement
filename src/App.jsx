import React from "react";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="container mx-auto">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Inventory Management System</h1>
      </header>
      <main className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <ProductList />
        </div>
        <div className="md:w-1/3">
          <Cart />
        </div>
      </main>
    </div>
  );
}

export default App;
