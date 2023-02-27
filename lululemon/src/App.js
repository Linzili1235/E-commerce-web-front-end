import './App.css';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Main} from "./components/Main";
import {GET_FILTER_API} from "./Helper";
import {useEffect, useState} from "react";
import actions from "./actions";
import {useDispatch} from "react-redux";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(actions?.productAction.getAllProductItems())
        //works as a cleanup function
        .then(()=> setIsLoading( false))
  },[])

  // Fetch all filters
  useEffect(() => {
    dispatch(actions?.filterAction.selectAllFilters())
        .then(()=> setIsLoading(false))
  },[])

  return (
    <div className="App">
      <Header/>
        <Main className="mainPage"/>
        <Footer/>


    </div>
  );
}

export default App;
