import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Home from "./components/Home.jsx";
import Play from "./components/Play.jsx";
import AboutUs from "./components/AboutUs.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
