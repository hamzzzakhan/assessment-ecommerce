import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import testProducts from "../data/testProducts.json";
import "../components/ProductCard.css";

const ProductCardDemo = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(testProducts);
      setFilteredProducts(testProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "accessories", label: "Accessories" },
    { value: "appliances", label: "Appliances" },
    { value: "shoes", label: "Shoes" }
  ];

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const LoadingSkeleton = () => {
    return (
      <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
        <div className="card h-100">
          <div className="card-img-container bg-light d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <div className="card-body">
            <div className="placeholder-glow">
              <span className="placeholder col-8 mb-2"></span>
              <span className="placeholder col-12 mb-2"></span>
              <span className="placeholder col-6 mb-3"></span>
              <span className="placeholder col-4 btn btn-primary disabled"></span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-4 mb-3">Product Card Demo</h1>
          <p className="lead text-muted">
            Responsive Product Cards with variant options and modern UI/UX design
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`btn ${
                  selectedCategory === category.value
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn-sm`}
                onClick={() => handleCategoryFilter(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <i className="fa fa-search fa-3x mb-3"></i>
              <h4>No products found</h4>
              <p>Try selecting a different category</p>
            </div>
          </div>
        )}
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fa fa-info-circle me-2"></i>
                Product Card Features
              </h5>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li><i className="fa fa-check text-success me-2"></i>Responsive design</li>
                    <li><i className="fa fa-check text-success me-2"></i>Product image with hover effects</li>
                    <li><i className="fa fa-check text-success me-2"></i>Product title and description</li>
                    <li><i className="fa fa-check text-success me-2"></i>Dynamic pricing display</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li><i className="fa fa-check text-success me-2"></i>Variant selection dropdown</li>
                    <li><i className="fa fa-check text-success me-2"></i>Stock management</li>
                    <li><i className="fa fa-check text-success me-2"></i>Add to cart functionality</li>
                    <li><i className="fa fa-check text-success me-2"></i>Out of stock indicators</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDemo;
