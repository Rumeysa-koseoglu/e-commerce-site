import React from "react";
import "../css/Product.css";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const { id, price, image, title, description } = product;

  const navigate = useNavigate();

  return (
    <div className="card">
      <img src={image} className="image" />
      <div>
        <p style={{ textAlign: "center", height: "50px" }}>{title}</p>
        <h3 style={{ textAlign: "center" }}>{price}₺</h3>
      </div>

      <div className="flex-row">
        <button
          onClick={() => navigate("/product-details/" + id)}
          className="details-button"
        >
          details..
        </button>
      </div>
    </div>
  );
}

export default Product;
