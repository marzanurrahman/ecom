import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../Container";
import ProductCard from "../../ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/all");
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="my-16">
      <Container>
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-black">
            Products
          </h2>
          <p className="mt-2 text-base text-black">
            Order it for you or for your beloved ones
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard product={product} key={i}/>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductList;
