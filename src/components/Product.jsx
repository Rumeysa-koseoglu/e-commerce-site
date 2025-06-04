import React from "react";
import "../css/Product.css";

function Product({ product }) {
  const { id, price, image, title, description } = product;
  return (
    <div className="card">
      <img src={image} className="image" />
      <div>
        <p style={{ textAlign: "center", height: "50px" }}>{title}</p>
        <h3 style={{ textAlign: "center" }}>{price}₺</h3>
      </div>

      <div className="flex-row">
        <button className="details-button">details..</button>
      </div>
    </div>
  );
}

export default Product;
