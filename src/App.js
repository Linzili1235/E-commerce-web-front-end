import './App.css';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Main} from "./components/Main";
import {GET_FILTER_API} from "./Helper";
import actions from "./actions";


function App() {

  return (
    <div className="App">
      <Header/>
        <Main className="mainPage"/>
        <Footer/>


    </div>
  );
}

export default App;
