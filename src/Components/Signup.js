import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import ButtonPrimary from "./ButtonPrimary";
import { app } from "../firebase";
import ButtonSecondary from "./ButtonSecondary";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const auth = getAuth(app);
  const dispatch = useDispatch();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(auth.currentUser, {
          displayName: fName,
        }).then(() => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: fName,
            })
          );
          navigate("/teslaacount");
        });
      })
      .catch((error) => alert(error.message));
  };

  const navigate = useNavigate();
  return (
    <div className="signup">
      <div className="signup">
        <div className="signup__header">
          <div className="signup__logo">
            <Link to="/">
              <img
                src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="signup__language">
            <LanguageOutlinedIcon /> <span>en-US</span>
          </div>
        </div>

        <div className="signup__info">
          <h1>Create Account</h1>

          <form className="signup__form">
            <label htmlFor="fName">First Name</label>
            <input
              type="text"
              id="fName"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />

            <label htmlFor="lName">Last Name</label>
            <input
              type="text"
              id="lName"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <ButtonPrimary
              name="Create account"
              type="Submit"
              onClick={signUp}
            />
          </form>

          <div className="signup__divider">
            <hr /> <span>OR</span> <hr />
          </div>

          <Link to="/login">
            <ButtonSecondary name="Sign in" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
