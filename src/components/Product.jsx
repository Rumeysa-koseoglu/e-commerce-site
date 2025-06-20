import React from "react";
import "../css/Product.css";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const { id, price, image, title, description } = product;

  const navigate = useNavigate();

  const handleNavigate = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate(`/product-details/${product.id}`);
  };

  return (
    <div className="card">
      <img src={image} className="image" />
      <div>
        <p className="product-title" title={title}>
          {title.split(" ").slice(0, 6).join(" ")}
        </p>

        <div className="flex-row" style={{ justifyContent: "space-between" }}>
          <h3
            style={{
              textAlign: "left",
              margin: "0 75px 0 10px",
              color: "#a9c5b2",
            }}
          >
            {price}₺
          </h3>

          <button
            onClick={() => handleNavigate(product)}
            className="details-button"
          >
            details..
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
