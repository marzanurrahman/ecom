import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 py-10 tracking-wide">
      {/* same container as navbar */}
      <div className="px-4 sm:px-10 max-w-screen-xl mx-auto">
        
        <div className="flex flex-wrap items-center md:justify-between max-md:flex-col gap-6">
          
          {/* Brand */}
          <div>
            <a href="/" className="text-[22px] font-semibold text-white">
              ecom
            </a>
          </div>

          {/* Links */}
          <ul className="flex items-center justify-center flex-wrap gap-y-2 md:justify-end space-x-6">
            <li>
              <a href="/" className="text-gray-300 hover:underline text-base">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-300 hover:underline text-base">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-300 hover:underline text-base">
                Contact
              </a>
            </li>
          </ul>

        </div>

        <hr className="my-6 border-gray-700" />

        <p className="text-center text-gray-400 text-base">
          © ecom. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
