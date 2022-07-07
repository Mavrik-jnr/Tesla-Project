import React, { useEffect, useState } from "react";

import Header from "./Components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./Components/Menu";
import HeaderBlock from "./Components/HeaderBlock";
import Login from "./Components/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Signup from "./Components/Signup";
import TeslaAccount from "./Components/TeslaAccount";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
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
            element={user ? <Navigate to="/teslaaccount" /> : <Login />}
          />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/teslaaccount"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <>
                  <TeslaAccount
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                  />
                  {isMenuOpen && <Menu />}
                </>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
