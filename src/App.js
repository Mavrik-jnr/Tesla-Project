import React, { useState } from "react";
import Header from "./Components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Menu from "./Components/Menu";
import HeaderBlock from "./Components/HeaderBlock";
// import { Switch } from "@material-ui/core";
// import { CompatRouter } from "react-router-dom-v5-compat";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header menuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                {isMenuOpen && <Menu />}
                <HeaderBlock />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Header menuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                {/* {isMenuOpen && <Menu />}
            <HeaderBlock /> */}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
