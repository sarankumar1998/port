import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./containers/Home";
import Skills from "./containers/Skills";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Msc from "./containers/Msc";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Myprofile from "./components/Myprofile/Myprofile";
import Cart from "./containers/Cart/Cart";
import Sports from "./components/Sports/Sports";
import Checkout from "./containers/Checkout/Checkout";
import ClientMail from "./containers/ClientMail/ClientMail";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Travelticket from "./containers/ClientMail/Travelticket";
import Forgot from "./components/Login/Forgot";
import ResetPassword from "./components/Login/ResetPassword";
import RatemyApp from "./containers/ClientMail/RatemyApp";


export const AppContext = createContext(null)

function App() {

const [routeState, setRouteState] = useState(JSON.parse(sessionStorage.getItem("user"))  || {})
console.log(routeState, "routeState");
// const stringifiedPerson = sessionStorage.getItem("user");
// const personAsObjectAgain = JSON.parse(stringifiedPerson);
// const [usersVal, setUsersVal] = useState(personAsObjectAgain);

// const navigate  = useNavigate()
// useEffect(() => {
//   setUsersVal(sessionStorage.getItem("user"));
//     // navigate("/login");

// }, []);



// useEffect(() => {
//   const usersVal = sessionStorage.getItem("user");
//   // console.log(usersVal);
// }, []);
  return (
    <div className="App">
              <AppContext.Provider value={{ routeState: routeState }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/msc" element={<Msc />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/clientmail" element={<ClientMail />} />
          <Route path="/travelticket" element={<Travelticket/>} />
          <Route path="/forgot" element={<Forgot/>} />
          <Route path="/ratemyapp" element={<RatemyApp/>} />
          <Route path="/reset/auth/:resetToken" element={<ResetPassword/>} />

        </Routes>
      </Router>
      </AppContext.Provider>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
