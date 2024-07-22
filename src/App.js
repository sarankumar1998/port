import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";

import Contact from "./containers/Contact";
import ClientForm from "./containers/ClientForm";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Myprofile from "./components/Myprofile/Myprofile";
import Sports from "./components/Sports/Sports";
import ClientMail from "./containers/ClientMail/ClientMail";
import { createContext, useState } from "react";
import Forgot from "./components/Login/Forgot";
import ResetPassword from "./components/Login/ResetPassword";
import RatemyApp from "./containers/ClientMail/RatemyApp";
import Navbars from "./components/Navbars";

export const AppContext = createContext(null);

function App() {
  const [routeState, setRouteState] = useState(JSON.parse(sessionStorage.getItem("user")) || {});

  return (
    <div className="App">
      <AppContext.Provider value={{ routeState: routeState }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset/auth/:resetToken" element={<ResetPassword />} />
            <Route
              path="/*"
              element={
                <>
                  <Navbars />
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="sports" element={<Sports />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/clientForm" element={<ClientForm />} />
                    <Route path="/myprofile" element={<Myprofile />} />
                    <Route path="/clientmail" element={<ClientMail />} />
                    <Route path="/ratemyapp" element={<RatemyApp />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
