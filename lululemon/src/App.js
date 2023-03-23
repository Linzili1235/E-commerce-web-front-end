import './App.scss';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import {Main} from "./components/mainPageComponents/Main";
import {Cart} from "./components/routerComponents/Cart/Cart";
import {Review} from "./components/routerComponents/Review"
import {Checkout} from "./components/routerComponents/Checkout"
import {PageNotFound} from "./components/routerComponents/PageNotFound";
import {SinglePageProduct} from "./components/routerComponents/SinglePageProduct/SinglePageProduct";
import './components/globalStyle-module.scss'
function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="mainPage/1/1" />}/>

          <Route path='/mainPage/:sortingId/:pageNum' element={<Main />}/>

          <Route path='/singleProduct/:id' element={<SinglePageProduct />}/>
          <Route path='/mybag' element={<Cart />}/>
          <Route path='/review' element={<Review />}/>
          <Route path='/checkout' element={<Checkout />}/>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
