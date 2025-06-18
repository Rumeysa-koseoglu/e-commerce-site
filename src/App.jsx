import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { calculateBasket, setDrawer } from "./redux/slices/basketSlice";
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
          {products &&
            products.map((product) => {
              return (
                <div key={product.id}>
                  <div className="flex-row" style={{ padding: "20px" }}>
                    <img
                      style={{ marginRight: "5px" }}
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
                      style={{
                        padding: "5px",
                        backgroundColor: "rgb(230, 233, 238)",
                        color: "#ff1c77",
                        border: "none ",
                        borderRadius: "5px",
                        width: "50px",
                      }}
                    >
                      clear
                    </button>
                  </div>
                </div>
              );
            })}
          <div>
            <p>total : {totalAmount}</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
