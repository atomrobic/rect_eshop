import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StyleHub from "./pages/StyleHub";
import Description from "./pages/Description"; // import your product detail page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StyleHub />} />
        <Route path="/product/:id" element={<Description />} />  {/* <-- add this */}
      </Routes>
    </Router>
  );
};

export default App;
