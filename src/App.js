import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import { createContext, useState } from "react";
import Travelticket from "./containers/ClientMail/Travelticket";
import Forgot from "./components/Login/Forgot";
import ResetPassword from "./components/Login/ResetPassword";
import RatemyApp from "./containers/ClientMail/RatemyApp";
import Navbars from "./components/Navbars";
import Notfound from "./containers/Notfound";

export const AppContext = createContext(null);

function Layout({ children }) {
  const location = useLocation();
  const hideNavbars = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot';

  return (
    <>
      {!hideNavbars && <Navbars />}
      {children}
    </>
  );
}

function App() {
  const [routeState, setRouteState] = useState(JSON.parse(sessionStorage.getItem("user")) || {});

  return (
    <div className="App">
      <AppContext.Provider value={{ routeState }}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/msc" element={<Msc />} />
              <Route path="/myprofile" element={<Myprofile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/clientmail" element={<ClientMail />} />
              <Route path="/travelticket" element={<Travelticket />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/ratemyapp" element={<RatemyApp />} />
              <Route path="/reset/auth/:resetToken" element={<ResetPassword />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Layout>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
