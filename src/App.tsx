import { useEffect, useState } from "react";
import "./App.scss";
import CardContainer from "./components/Card/CardContainer";
import Navbar from "./components/Navbar/Navbar";
import { useProductStore } from "./store/productStore";
import SearchAndSort from "./components/SearchAndSort/SearchAndSort";
import CategoryFilterSidebar from "./components/CategoryFilterSidebar/CategoryFilterSidebar";
import { ToastContainer } from "react-toastify";
import SkeletonUI from "./components/Skeleton/SkeletonUI";

function App() {
  const { products, loading, error, getProducts } = useProductStore();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log("searchTerm:" + searchTerm);
  const [sortOption, setSortOption] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
  };
  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
    )

    .filter((product) =>
      searchTerm !== ""
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : product
    )

    .sort((a, b) => {
      if (sortOption === "price-asc") {
        return a.price - b.price;
      } else if (sortOption === "price-desc") {
        return b.price - a.price;
      } else if (sortOption === "name-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "name-desc") {
        return b.title.localeCompare(a.title);
      } else {
        return 0;
      }
    });

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <div className="container">
        <div className="sidebar">
          <CategoryFilterSidebar
            products={products}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "1rem" }}>
            <SearchAndSort
              setSearchTerm={setSearchTerm}
              setSortOption={setSortOption}
            />
          </div>
          <div className="card-list">
            {loading &&
              Array.from({ length: 10 }).map((_, index) => {
                return (
                  <div key={index} style={{ margin: 20 }}>
                    <SkeletonUI />
                  </div>
                );
              })}
            {error && <p>{error}</p>}
            {filteredProducts.map((product) => (
              <CardContainer key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
