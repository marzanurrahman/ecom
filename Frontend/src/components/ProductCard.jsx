import { Link, useOutletContext } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { openCart } = useOutletContext(); // ✅ added

  const handleAddToCart = (e) => {
    e.preventDefault();      // stop Link navigation
    e.stopPropagation();     // extra safety

    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.discountPrice,
        image: product?.images?.[0],
        qty: 1,
      })
    );

    openCart(); // ✅ open cart drawer
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 p-3 sm:p-4 flex flex-col rounded-md transition-all">

      {/* Image */}
      <div className="mt-6">
        <div className="w-full sm:h-60 h-160px overflow-hidden rounded-md bg-gray-100">
          <img
            src={product?.images?.[0] || "/placeholder.png"}
            alt={product?.name || "Product image"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <Link to={`/product/${product._id}`} className="flex flex-col h-full mt-6">
        <div className="flex-1">

          {/* Category */}
          {product.category && (
            <p className="text-xs text-gray-500 mb-1">
              {product.category.name}
            </p>
          )}

          {/* Title */}
          <h4 className="text-sm sm:text-[15px] font-semibold text-slate-900">
            {product.name}
          </h4>

          {/* Price */}
          <div className="mt-4">
            <div>
              <span className="text-base sm:text-lg text-red-600 font-semibold">
                ${product.discountPrice}
              </span>

              {product.sellingPrice && (
                <strike className="text-slate-400 ml-2 font-medium">
                  ${product.sellingPrice}
                </strike>
              )}
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full mt-6 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-sm text-white font-medium rounded-md transition-all"
        >
          Add to cart
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
