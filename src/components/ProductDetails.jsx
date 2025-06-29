import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";
import "../css/ProductDetails.css";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from "../redux/slices/basketSlice";

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

  const addBasket = () => {
    const payload = {
      id,
      price,
      image,
      title,
      description,
      count,
    };

    dispatch(addToBasket(payload));
    dispatch(calculateBasket());
  };

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      dispatch(setSelectedProduct(JSON.parse(storedProduct)));
    } else {
      getProductById();
    }
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
      <div className="proDetails-card">
        <img className="proDetails-image" src={image} />
      </div>

      <div className="description-section">
        <h2 className="proDetails-title">
          {title ? title.split(" ").slice(0, 6).join(" ") : ""}
        </h2>

        <p className="proDetails-desc" title={description}>
          {description
            ? description
                .split(" ")
                .slice(0, 20)
                .map((word, index) =>
                  index === 8 ? (
                    <span className="proDetails-desc" key={index}>
                      <br />
                      {word}{" "}
                    </span>
                  ) : (
                    word + " "
                  )
                )
            : ""}
          ..
        </p>
        <h1 className="price">{price}₺</h1>
        <div className="iconsAndButton">
          <div className="icons-container">
            <CiSquareMinus onClick={decrement} className="minus-icon" />
            <span>{count}</span>
            <CiSquarePlus onClick={increment} className="plus-icon" />
          </div>
          <button onClick={addBasket} className="add-basket-btn">
            add to basket
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
