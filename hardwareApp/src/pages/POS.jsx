import React, { useState } from 'react';
import NavbarCashier from '../components/navbarcashier';

export default function POS() {
  const [cartItems, setCartItems] = useState([]);
  const [cash, setCash] = useState('');
  const [receipt, setReceipt] = useState(null);

  const products = [
    { id: 1, name: 'Circuit Breaker', price: 350, stock: 25 },
    { id: 2, name: 'Measuring Tape', price: 75, stock: 25 },
  ];

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increment = (id) =>
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decrement = (id) =>
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );

  const remove = (id) => setCartItems(cartItems.filter((item) => item.id !== id));

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (Number(cash) >= totalPrice) {
      const change = Number(cash) - totalPrice;
      setReceipt({ items: cartItems, total: totalPrice, cash: Number(cash), change });
      setCartItems([]);
      setCash('');
      alert(`Payment successful! Change: ₱${change.toFixed(2)}`);
    } else {
      alert('Insufficient amount');
    }
  };

  return (
    <NavbarCashier>
      <div className="max-w-7xl mx-auto p-6 font-sans flex gap-6">
        {/* Products */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-300 rounded-xl p-4 shadow"
            >
              <h2 className="text-xl font-semibold text-gray-700">{p.name}</h2>
              <p className="text-sm text-gray-500">Stocks: {p.stock}</p>
              <p className="text-sm text-gray-500 mb-2">Price: ₱{p.price}</p>
              <button
                onClick={() => addToCart(p)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="w-80 bg-gray-50 border border-gray-300 rounded-xl p-4 shadow sticky top-20 h-fit">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="border-b border-gray-200 py-2 mb-2">
                <div className="flex justify-between items-center">
                  <span>
                    {item.name} - ₱{item.price} x {item.quantity}
                  </span>
                  <div className="space-x-1">
                    <button
                      onClick={() => increment(item.id)}
                      className="bg-blue-500 text-white px-2 rounded hover:bg-blue-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrement(item.id)}
                      className={`px-2 rounded text-white ${
                        item.quantity === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          <p className="font-bold mt-4">Total: ₱{totalPrice.toFixed(2)}</p>

          {/* Payment Section */}
          {cartItems.length > 0 && (
            <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-4 shadow">
              <h2 className="text-lg font-semibold text-yellow-800">Payment</h2>
              <p className="text-gray-700 mb-2">
                Total Price: ₱{totalPrice.toFixed(2)}
              </p>
              <input
                type="number"
                placeholder="Enter cash"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <button
                onClick={handlePayment}
                className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600"
              >
                Proceed
              </button>
            </div>
          )}

          {/* Receipt */}
          {receipt && (
            <div className="mt-8 bg-white border border-gray-300 rounded-xl p-4 shadow">
              <h2 className="text-xl font-bold mb-4 text-center">Receipt</h2>
              <ul className="mb-4">
                {receipt.items.map((i) => (
                  <li key={i.id} className="flex justify-between">
                    <span>
                      {i.name} x {i.quantity}
                    </span>
                    <span>₱{(i.price * i.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold">Total: ₱{receipt.total.toFixed(2)}</p>
              <p>Cash: ₱{receipt.cash.toFixed(2)}</p>
              <p>Change: ₱{receipt.change.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </NavbarCashier>
  );
}
