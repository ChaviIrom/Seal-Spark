import React from 'react';
import '../styles/DesignQuantitySelector.css';

export default function QuantitySelector({ quantity, onDecrement, onIncrement }) {
  return (
    <div className="quantity-selector">
      <button className="qty-btn" onClick={onDecrement}>−</button>
      <span className="qty-value">{quantity}</span>
      <button className="qty-btn" onClick={onIncrement}>+</button>
    </div>
  );
}
