import React, { createContext, useContext, useState } from 'react';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { name: "Pliers", qty: 0, unit: "Pieces", date: "2022-12-21", status: "Out of stock", category: "Tools" },
    { name: "Steel Nail", qty: 10, unit: "Kilograms", date: "2022-12-05", status: "In-stock", category: "Hardware" },
    { name: "Circuit Breaker", qty: 0, unit: "Pieces", date: "2022-12-08", status: "Out of stock", category: "Electrical" },
    { name: "Electrical tape", qty: 5, unit: "Pieces", date: "2023-01-09", status: "Low stock", category: "Electrical" },
  ]);

  const calculateStatus = (qty) =>
    qty === 0 ? "Out of stock" : qty < 5 ? "Low stock" : "In-stock";

  const addProduct = (newProduct) => {
    const productWithStatus = {
      ...newProduct,
      status: calculateStatus(newProduct.qty)
    };
    setProducts(prev => [...prev, productWithStatus]);
  };

  const updateProduct = (productName, updatedProduct) => {
    const productWithStatus = {
      ...updatedProduct,
      status: calculateStatus(updatedProduct.qty)
    };
    setProducts(prev => prev.map(p => p.name === productName ? productWithStatus : p));
  };

  const deleteProduct = (productName) => {
    setProducts(prev => prev.filter(p => p.name !== productName));
  };

  const addStock = (productName, addedQty) => {
    setProducts(prev => prev.map(p => {
      if (p.name === productName) {
        const newQty = p.qty + addedQty;
        return {
          ...p,
          qty: newQty,
          status: calculateStatus(newQty)
        };
      }
      return p;
    }));
  };

  const getLowStockItems = () => {
    return products.filter(product => 
      product.status === "Low stock" || product.status === "Out of stock"
    );
  };

  const getInventoryStats = () => {
    return {
      totalProducts: products.length,
      lowStockCount: products.filter(p => p.status === "Low stock").length,
      outOfStockCount: products.filter(p => p.status === "Out of stock").length,
      inStockCount: products.filter(p => p.status === "In-stock").length,
    };
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    addStock,
    getLowStockItems,
    getInventoryStats,
    calculateStatus
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
