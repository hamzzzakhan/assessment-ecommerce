import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedVariant: selectedVariant,
      finalPrice: selectedVariant ? selectedVariant.price : product.price
    };
    dispatch(addCart(productToAdd));
    toast.success("Added to cart");
  };

  const isOutOfStock = () => {
    if (selectedVariant) {
      return selectedVariant.stock <= 0;
    }
    return product.stock !== undefined && product.stock <= 0;
  };

  const getCurrentPrice = () => {
    if (selectedVariant && selectedVariant.price) {
      return selectedVariant.price;
    }
    return product.price;
  };

  const handleVariantChange = (e) => {
    const variantId = e.target.value;
    const variant = product.variants.find(v => v.id === variantId);
    setSelectedVariant(variant);
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
      <div className="card product-card h-100 shadow-sm border-0">
        <div className="card-img-container position-relative overflow-hidden">
          <img
            className="card-img-top product-image"
            src={product.image || product.imageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
            alt={product.title || product.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
          {isOutOfStock() && (
            <div className="out-of-stock-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
              <span className="badge bg-danger fs-6">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title product-title mb-2">
            {product.title || product.name}
          </h5>
          
          <p className="card-text product-description text-muted mb-3 flex-grow-1">
            {product.description && product.description.length > 80
              ? `${product.description.substring(0, 80)}...`
              : product.description || "No description available"
            }
          </p>

          <div className="product-price mb-3">
            <span className="h5 text-primary mb-0">${getCurrentPrice()}</span>
            {product.originalPrice && product.originalPrice > getCurrentPrice() && (
              <span className="text-muted text-decoration-line-through ms-2">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-3">
              <label htmlFor={`variant-${product.id}`} className="form-label small text-muted">
                Options:
              </label>
              <select
                id={`variant-${product.id}`}
                className="form-select form-select-sm"
                value={selectedVariant ? selectedVariant.id : ""}
                onChange={handleVariantChange}
                disabled={isOutOfStock()}
              >
                {product.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} {variant.price && `- $${variant.price}`}
                    {variant.stock !== undefined && variant.stock <= 0 && " (Out of Stock)"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="product-actions mt-auto">
            <div className="d-grid gap-2">
              {isOutOfStock() ? (
                <button className="btn btn-secondary" disabled>
                  Out of Stock
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-add-cart"
                    onClick={handleAddToCart}
                  >
                    <i className="fa fa-shopping-cart me-2"></i>
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Details
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
