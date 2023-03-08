import './App.scss';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Routes, Route, Navigate} from "react-router-dom";
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
    //todo: Fix lazy loading issue when importing
    // Lazy loading
    // const MainPage = lazy(() => import('./components/mainpage/mainPageComponents/MainPage'));

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch()

    // Fetch data by Redux thunk
    // [fetchOneProduct] is the function that will be executed by Redux thunk middleware
    // this is the purpose of the redux thunk which lets you dispatch a function as an action

    //fetch all products
    useEffect( () => {
        dispatch(actions?.productActions?.fetchAllProducts())
            .then(()=> setIsLoading( false))
    },[]);

    // Fetch all filters
    useEffect(() => {
        dispatch(actions?.filterActions?.getFilters())
            .then(()=> setIsLoading(false))
    },[]);

  return isLoading ? (
      <div>loading...</div>
  ) : (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="mainPage/1" />}/>

          <Route path='/mainPage/:pageNum' element={<Main />}/>

          {/*<Route path='/mainPage/:pageNum' element={*/}
          {/*    <Suspense fallback={<div>Loading...</div>}>*/}
          {/*        <MainPage />*/}
          {/*    </Suspense>*/}
          {/*}/>*/}


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
