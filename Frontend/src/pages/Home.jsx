import heroImage from "../assets/banner.jpg";
import ProductList from "../components/screen/home/ProductList";

function Home() {
  return (
    <>
      <section
        className="
          h-[60vh] lg:h-[70vh]
          bg-cover bg-center
          flex items-center
          justify-center lg:justify-center
          px-4
        "
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div
          className="
            bg-white/90
            px-6 py-8
            lg:px-18 lg:py-20
            text-center
            max-w-xl
          "
        >
          <h1 className="text-2xl lg:text-3xl font-semibold mb-4">
            Winter Sells Running!
          </h1>

          <p className="text-gray-600 mb-6 text-sm lg:text-base">
            Enjoy Special Discounts, Free Delivery, and Surprise Gifts on Every Purchase.
          </p>

          <button className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition">
            Discover Special Offers
          </button>
        </div>
      </section>

      <ProductList />

    </>
  );
}

export default Home;
