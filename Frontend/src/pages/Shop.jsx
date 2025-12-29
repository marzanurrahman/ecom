import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router";

const PRODUCTS_PER_PAGE = 16;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(10000);
  const [page, setPage] = useState(1);

  // fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/product/all"
      );
      setProducts(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/all"
      );
      setCategories(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // price + category filter
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const priceMatch = (p?.discountPrice ?? 0) <= price;
      const categoryMatch = selectedCategory
        ? p?.category?._id === selectedCategory
        : true;
      return priceMatch && categoryMatch;
    });
  }, [products, price, selectedCategory]);

  // pagination
  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <main className="py-10">
      <Container>

        {/* BREADCRUMB */}
        <div className="mb-6 text-sm text-slate-500">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">Shop</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* FILTER */}
          <div className="w-full lg:max-w-[280px] lg:border-r border-gray-100 lg:pr-6">
            <div className="bg-gray-50 px-6 py-6 rounded-md lg:rounded-none">

              <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
                <h3 className="text-slate-900 text-lg font-semibold">
                  Filter
                </h3>
                <button
                  onClick={() => {
                    setPrice(10000);
                    setSelectedCategory("");
                    setPage(1);
                  }}
                  className="text-sm text-red-500 font-semibold ml-auto"
                >
                  Clear
                </button>
              </div>

              {/* PRICE FILTER */}
              <div>
                <h4 className="text-slate-900 text-base font-semibold">
                  Price
                </h4>

                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={price}
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full mt-4 accent-slate-900"
                />

                <div className="flex justify-between text-sm text-slate-600 mt-2">
                  <span>$0</span>
                  <span>${price}</span>
                </div>
              </div>

              {/* CATEGORY DROPDOWN */}
              <div className="mt-8">
                <h4 className="text-slate-900 text-base font-semibold mb-3">
                  Category
                </h4>

                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPage(1);
                  }}
                  className="w-full border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 text-sm border ${
                      page === i + 1
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </Container>
    </main>
  );
};

export default Shop;
