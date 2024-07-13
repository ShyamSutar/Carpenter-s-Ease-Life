import Header from "./components/defaultComponents/Header";
import Footer from "./components/defaultComponents/Footer";
import { Outlet } from "react-router-dom";
import useScrollToHash from './components/useScrollToHash.jsx';

const App = () => {
  //for navigating from register to /#...
  useScrollToHash();
  
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default App;
