import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slices/productSlice";
import Product from "./Product";

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);
  const searchTerm = useSelector((store) => store.app?.searchTerm || "");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const productsToShow = searchTerm.trim() === "" ? products : filteredProducts;

  return (
    <div className="flex-row" style={{ flexWrap: "wrap", marginTop: "30px" }}>
      {productsToShow.length === 0 ? (
        <p>No matching products found</p>
      ) : (
        productsToShow.map((product) => (
          <Product key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

export default ProductList;
