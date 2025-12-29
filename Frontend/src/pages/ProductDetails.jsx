import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchSingleProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/product/single/${id}`
      );
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/all");
      setRelatedProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    fetchRelatedProducts();
    setActiveImage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  /* =======================
     CART HANDLERS
  ======================= */

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.discountPrice ?? product.sellingPrice,
        image: product?.images?.[0],
        qty: 1,
      })
    );
  };

  const handleBuyNow = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.discountPrice ?? product.sellingPrice,
        image: product?.images?.[0],
        qty: 1,
      })
    );

    navigate("/checkout");
  };

  return (
    <main className="py-10">
      <Container>
        {/* BREADCRUMB */}
        <div className="mb-6 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link
            to={`/category/${product?.category?._id}`}
            className="hover:text-black"
          >
            {product?.category?.name || "Category"}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">
            {product?.name || "Product"}
          </span>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* IMAGE SECTION */}
          <div className="lg:col-span-3 lg:sticky top-24">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Main Image */}
              <div className="flex-1 order-1 lg:order-2">
                <img
                  src={product?.images?.[activeImage]}
                  alt={product?.name}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                  className="w-full aspect-750/800 object-cover rounded-md"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-2 order-2 lg:order-1 lg:w-16">
                {product?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumb"
                    onClick={() => setActiveImage(index)}
                    onError={(e) => (e.target.src = "/placeholder.png")}
                    className={`w-16 aspect-64/85 object-cover cursor-pointer rounded-sm ${
                      activeImage === index
                        ? "border border-black"
                        : "border border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {product?.category?.name}
            </p>

            {/* PRICE */}
            <div className="flex gap-4 mt-6 items-center">
              <h2 className="text-3xl font-semibold">
                ${product?.discountPrice ?? product?.sellingPrice ?? 0}
              </h2>

              {product?.sellingPrice &&
                product?.discountPrice &&
                product?.sellingPrice > product?.discountPrice && (
                  <strike className="text-gray-400">
                    ${product?.sellingPrice}
                  </strike>
                )}
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="w-1/2 border px-4 py-3"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-1/2 bg-slate-900 text-white px-4 py-3"
              >
                Buy Now
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-10">
              <h3 className="font-semibold text-lg">Product Description</h3>
              <p className="text-sm text-gray-500 mt-3">
                {product?.description}
              </p>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-8">
            You may also like
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts
              ?.filter((p) => p._id !== id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProductDetails;
