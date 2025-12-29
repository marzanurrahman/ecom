import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const { items: cartItems } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Address is required");
      return;
    }

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/order/create",
        { address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully");
      navigate("/profile"); // or orders page
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message || "Order placement failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-12 min-h-[70vh]">
      <Container>
        <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT – BILLING */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              Billing Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="border px-4 py-2 rounded-md outline-none"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="border px-4 py-2 rounded-md outline-none"
              />

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="border px-4 py-2 rounded-md outline-none"
              />
            </div>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full Address"
              rows="4"
              className="border px-4 py-2 rounded-md outline-none w-full mt-4"
            />
          </div>

          {/* RIGHT – SUMMARY */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>${item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${subtotal}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
              className={`w-full mt-6 py-2.5 rounded-md text-white ${
                loading || cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>

        </div>
      </Container>
    </main>
  );
};

export default Checkout;
