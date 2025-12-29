import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return; // extra safety
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-lg bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-slate-900 flex-1">
            Shopping Cart
          </h3>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {cartItems.length === 0 && (
            <p className="text-sm text-slate-500">
              Your cart is empty.
            </p>
          )}

          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-900">
                  {item.name}
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  Qty: {item.qty}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-slate-900">
                    ${item.price * item.qty}
                  </span>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-xs text-red-600 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between font-semibold text-slate-900">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
            className={`mt-6 w-full py-2.5 text-sm font-medium rounded-md text-white transition-all
              ${
                cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
