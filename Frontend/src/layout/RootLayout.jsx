import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navber";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const RootLayout = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />

      <Outlet context={{ openCart: () => setCartOpen(true) }} />

      <Footer />

      {cartOpen && (
        <CartDrawer onClose={() => setCartOpen(false)} />
      )}
    </>
  );
};

export default RootLayout;
