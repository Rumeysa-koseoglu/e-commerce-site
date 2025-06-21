import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateBasket,
  removeFromBasket,
  setDrawer,
} from "./redux/slices/basketSlice";
import { useEffect } from "react";

function App() {
  const { products, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, []);

  return (
    <div>
      <PageContainer>
        <Header /> {/**the header section in pagecontainer */}
        <RouterConfig />
        {/**the outer box that includes all content */}
        <Loading />
        <Drawer
          anchor="right"
          onClose={() => dispatch(setDrawer())}
          open={drawer}
        >
          <div style={{ width: "400px", padding: "20px" }}>
            {products && products.length > 0 ? (
              <>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#ed6c02",
                  }}
                >
                  Your Basket 🧺
                </p>
                {products.map((product) => (
                  <div key={product.id}>
                    <div className="flex-row" style={{ padding: "20px" }}>
                      <img
                        style={{ marginRight: "20px", objectFit: "contain" }}
                        src={product.image}
                        width={40}
                        height={50}
                      />
                      <p style={{ width: "350px", marginRight: "5px" }}>
                        {product.title}({product.count})
                      </p>
                      <p style={{ marginRight: "10px", width: "60px" }}>
                        {product.price}₺
                      </p>

                      <button
                        onClick={() => {
                          dispatch(removeFromBasket(product.id));
                          dispatch(calculateBasket());
                        }}
                        style={{
                          padding: "5px",
                          backgroundColor: "#f5f7fa",
                          color: "#a9c5be",
                          border: "none ",
                          borderRadius: "5px",
                          width: "55px",
                        }}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                ))}
                <div>
                  <p>Total: {totalAmount}₺</p>
                </div>
              </>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "100px",
                  fontSize: "18px",
                  color: "#888",
                }}
              >
                There is no product in the basket yet.
              </p>
            )}
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
