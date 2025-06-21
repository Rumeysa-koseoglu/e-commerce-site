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
      <div
        className="card-details container"
        style={{
          backgroundColor: "#fff",
          marginRight: "50px",
          padding: "0 30px 0 30px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          <img
            style={{ objectFit: "contain" }}
            src={image}
            width={150}
            height={200}
            alt=""
          />
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
            <button onClick={addBasket} className="add-basket">
              add to basket
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2
          style={{ margin: "0 0 20px 0", fontWeight: "400", color: "#405a53" }}
        >
          {title}
        </h2>
        <p style={{ fontSize: "15px", fontWeight: "300", color: "#a9c5be" }}>
          {description}
        </p>
        <h1 className="price">{price}₺</h1>
      </div>
    </div>
  );
}

export default ProductDetails;
