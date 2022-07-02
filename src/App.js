import React, { useState } from "react";
import Header from "./Components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Menu from "./Components/Menu";
import HeaderBlock from "./Components/HeaderBlock";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Router>
      <div className="App">
        <Header menuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {isMenuOpen && <Menu />}
        <HeaderBlock />
      </div>
    </Router>
  );
}

export default App;
