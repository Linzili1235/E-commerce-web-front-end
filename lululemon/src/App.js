import './App.scss';
import React, {lazy} from 'react'
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import {Main} from "./components/mainPageComponents/Main";
import {PageNotFound} from "./components/routerComponents/PageNotFound";
import {RequireAuth} from "./components/routerComponents/UserAccount/RequireAuth";
import './components/globalStyle-module.scss'
import {Layout} from "./components/Layout";
// dynamic loading (lazy loading)
const SinglePageProduct = lazy(() => import("./components/routerComponents/SinglePageProduct/SinglePageProduct").then(module => {
        return { default: module.SinglePageProduct}
    }
))
const Cart = lazy(() => import("./components/routerComponents/Cart/Cart").then(module => {
        return { default: module.Cart}
    }
))
const Checkout = lazy(() => import("./components/routerComponents/Checkout/Checkout").then(module => {
        return { default: module.Checkout}
    }
))
const Review = lazy(() => import("./components/routerComponents/Review").then(module => {
        return { default: module.Review}
    }
))
const ResetPassword = lazy(() => import("./components/routerComponents/Checkout/ResetPassword").then(module => {
        return { default: module.default}
    }
))

const SignIn = lazy(() => import("./components/routerComponents/UserAccount/SignIn").then(module => {
    return { default: module.SignIn}
}))

const CreateUser = lazy(() => import("./components/routerComponents/UserAccount/CreateUser").then(module => {
    return { default: module.CreateUser}
}))

const OrderPlaced = lazy(() => import("./components/routerComponents/Checkout/OrderPlaced").then(module => {
    return {default: module.OrderPlaced}
}))


function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
            {/*<Route path="/" element={<Layout/>}/>*/}

            <Route path="/" element={<Navigate to="mainPage/1/1" />}/>
            <Route path='/mainPage/:sortingId/:pageNum' element={<Main />}/>
            <Route path='/singleProduct/:id' element={<SinglePageProduct />}/>
            <Route path='/mybag' element={<Cart />}/>
            <Route element={<RequireAuth/>}>
                <Route path='/review' element={<Review />}/>
                <Route path='/reset' element={<ResetPassword />}/>
                <Route path='/checkout' element={<Checkout />}/>
                <Route path='/orderPlaced' element={<OrderPlaced/>}/>
            </Route>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='/createUser' element={<CreateUser/>}/>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>

        <Footer/>
      </div>
  );
}

export default App;
