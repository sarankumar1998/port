import "./App.css";
import Navbars from "./components/Navbars";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Skills from "./containers/Skills";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Msc from "./containers/Msc";
import Footer from "./components/footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Myprofile from "./components/Myprofile/Myprofile";
import Product from "./containers/Product/Product";
import Cart from "./containers/Cart/Cart";
import Sports from "./components/Sports/Sports";
import Checkout from "./containers/Checkout/Checkout";


function App() {  
  return (
    <div className="App">
     
      <Router>
      {/* <Navbars /> */}
        <Routes>
          
        <Route  path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/msc" element={<Msc />} />
          <Route path="/myprofile" element={<Myprofile/>} />
          <Route path="/product" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/sports" element={<Sports/>} /> 
          <Route path="/checkout" element={<Checkout/>} />  
     
        </Routes>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;


