import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

function Navbar({ onCartClick }) {
  const [open, setOpen] = useState(false);
  const collapseRef = useRef(null);
  const navigate = useNavigate();

  // auth state
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  // cart count
  const cartCount = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.qty,
      0
    )
  );

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // close menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // mobile menu display control
  useEffect(() => {
    const el = collapseRef.current;
    if (!el) return;

    if (window.innerWidth < 1024) {
      el.style.display = open ? "block" : "none";
    } else {
      el.style.display = "";
    }
  }, [open]);

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="border-b border-gray-300 bg-white h-[70px] relative z-50 flex items-center">
      <div className="px-4 py-3 w-full">
        <div className="flex items-center justify-between sm:px-10 max-w-7xl mx-auto">

          {/* Logo */}
          <Link
            to="/"
            className="text-[20px] font-semibold text-green-600"
          >
            ecom
          </Link>

          {/* Menu */}
          <div ref={collapseRef} className="max-lg:hidden lg:block">
            <ul
              className={`lg:flex lg:gap-x-10 max-lg:space-y-3 ${
                open
                  ? "max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[280px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md z-50"
                  : "max-lg:hidden"
              }`}
            >
              <li className="hidden max-lg:block mb-6">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="text-[20px] font-semibold text-green-600"
                >
                  ecom
                </Link>
              </li>

              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-gray-600 hover:text-blue-700"
                >
                  Shop
                </Link>
              </li>

              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-gray-600 hover:text-blue-700"
                >
                  About
                </Link>
              </li>

              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-gray-600 hover:text-blue-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-5">
            <FiUser
              className="w-5 h-5 cursor-pointer"
              onClick={handleUserClick}
            />

            {/* Cart icon with count */}
            <div className="relative">
              <FiShoppingCart
                className="w-5 h-5 cursor-pointer"
                onClick={onCartClick}
              />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {!open ? (
              <button className="lg:hidden" onClick={() => setOpen(true)}>
                <FiMenu className="w-7 h-7" />
              </button>
            ) : (
              <button
                className="lg:hidden fixed top-2 right-4 z-50 bg-white w-9 h-9 rounded-full border flex items-center justify-center"
                onClick={() => setOpen(false)}
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
