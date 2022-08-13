import "./App.css";
import Navbars from "./components/Navbars";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Skills from "./containers/Skills";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Msc from "./containers/Msc";
import Footer from "./components/footer/Footer";
import News from "./containers/News";

function App() {
  return (
    <div className="App">
      <Navbars />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/msc" element={<Msc />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
