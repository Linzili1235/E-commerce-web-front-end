import './App.scss';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import actions from "./actions";
import {useDispatch} from "react-redux";
import {Main} from "./components/mainPageComponents/Main";
import {Cart} from "./components/routerComponents/Cart";
import {Review} from "./components/routerComponents/Review"
import {Payment} from "./components/routerComponents/Payment"
import {PageNotFound} from "./components/routerComponents/PageNotFound";
import {SinglePageProduct} from "./components/routerComponents/SinglePageProduct/SinglePageProduct";

function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="mainPage/1/1" />}/>

          <Route path='/mainPage/:sortingId/:pageNum' element={<Main />}/>

          <Route path='/singleProduct/:id' element={<SinglePageProduct />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/review' element={<Review />}/>
          <Route path='/payment' element={<Payment />}/>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
