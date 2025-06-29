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
          <div className="drawer">
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
                    <div className="flex-row" style={{ padding: "10px" }}>
                      <img className="drawer-image" src={product.image} />
                      <p className="drawer-prod-title">
                        {product.title
                          ? product.title.split(" ").slice(0, 6).join(" ")
                          : ""}
                        ({product.count})
                      </p>
                      <p className="drawer-prod-price">{product.price}₺</p>

                      <button
                        className="drawer-button"
                        onClick={() => {
                          dispatch(removeFromBasket(product.id));
                          dispatch(calculateBasket());
                        }}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                ))}
                <div>
                  <p>
                    Total: <span className="total-price">{totalAmount}₺</span>
                  </p>
                </div>
              </>
            ) : (
              <p className="drawer-info-text">
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
