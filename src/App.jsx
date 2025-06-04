import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/header";
import ProductList from "./components/ProductList";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";

function App() {
  return (
    <div>
      <PageContainer>
        {/**the outer box that includes all content */}
        <Loading />
        <Header /> {/**the header section in pagecontainer */}
        <RouterConfig />
      </PageContainer>
    </div>
  );
}

export default App;
