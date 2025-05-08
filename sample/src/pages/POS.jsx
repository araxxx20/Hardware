import React, { useState } from 'react';
import '../POS.css';

export default function POS() {
  const [cartItems, setCartItems] = useState([]);
  const [cash, setCash] = useState(0);
  const [receipt, setReceipt] = useState(null);

  const products = [
    { id: 1, name: 'Circuit Breaker', price: 350, stock: 25 },
    { id: 2, name: 'Measuring Tape', price: 75, stock: 25 }
  ];

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increment = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrement = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const remove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (cash >= totalPrice) {
      const change = cash - totalPrice;
      setReceipt({ items: cartItems, total: totalPrice, cash, change });
      setCartItems([]);
      alert(`Payment successful! Change: ₱${change}`);
    } else {
      alert('Insufficient amount');
    }
  };

  return (
    <div className="container">
      <h1 className="title">BABA POS</h1>
      <div className="products-cart">
        {products.map(p => (
          <div key={p.id} className="product">
            <h2>{p.name}</h2>
            <p>Stocks: {p.stock}</p>
            <p>Price: ₱{p.price}</p>
            <button onClick={() => addToCart(p)} className="btn-add">Add to cart</button>
          </div>
        ))}
        <div className="cart">
          <h2>Cart</h2>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              {item.name} - ₱{item.price} x {item.quantity}
              <div>
                <button onClick={() => increment(item.id)}>+</button>
                <button onClick={() => decrement(item.id)}>-</button>
                <button onClick={() => remove(item.id)} className="btn-remove">x</button>
              </div>
            </div>
          ))}
          <p className="total">Total: ₱{totalPrice}</p>
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="payment">
          <h2>Payment</h2>
          <p>Total Price: ₱{totalPrice}</p>
          <input
            type="number"
            placeholder="Enter cash"
            onChange={(e) => setCash(Number(e.target.value))}
          />
          <button onClick={handlePayment} className="btn-proceed">Proceed</button>
        </div>
      )}

      {receipt && (
        <div className="receipt">
          <h2>Receipt</h2>
          <p>BABA HARDWARE<br />Brgy. Rizal, Tuy, Batangas</p>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {receipt.items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₱{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3">Total</td>
                <td>₱{receipt.total}</td>
              </tr>
              <tr>
                <td colSpan="3">Cash</td>
                <td>₱{receipt.cash}</td>
              </tr>
              <tr>
                <td colSpan="3">Change</td>
                <td>₱{receipt.change}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
