import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";
import "../css/ProductDetails.css";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

function ProductDetails() {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((store) => store.product);
  const { price, image, title, description } = selectedProduct;

  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = () => {
    products &&
      products.map((product) => {
        if (product.id == id) {
          dispatch(setSelectedProduct(product));
        }
      });
  };

  return (
    <div className="pro-details">
      <div style={{ marginRight: "50px" }}>
        <img src={image} width={200} height={300} alt="" />
      </div>

      <div>
        <h1>{title}</h1>
        <p style={{ fontSize: "20px" }}>{description}</p>
        <h1 className="price">{price}₺</h1>

        <div className="icons-container">
          <CiSquareMinus
            onClick={decrement}
            className="icons"
            style={{ marginRight: "5px" }}
          />
          <span>{count}</span>
          <CiSquarePlus
            onClick={increment}
            className="icons"
            style={{ marginLeft: "5px" }}
          />
        </div>

        <div>
          <button className="basket">add to basket</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
