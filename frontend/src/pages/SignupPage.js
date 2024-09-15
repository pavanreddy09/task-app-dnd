import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { genConfig } from "react-nice-avatar";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import GoogleLoginPage from "../components/GoogleLogin";
import { API_BASE_URL } from "../constants";
import axios from 'axios';

function SignupPage() {
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [conformPasswordHasFocus, setConformPasswordHasFocus] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState("Password Not matched");
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.fname) {
      alert("First Name is Required");
      return;
    }
    if (!formValues.email) {
      alert("Email is Required");
      return;
    }
    if (!formValues.password) {
      alert("Password is Required");
      return;
    }
    if (formValues.password != formValues.cpassword) {
      alert("Password not matched");
    }
    try {
        setIsLoading(true);
        const avatarConfig = genConfig();
        const formData = {
          firstname: formValues.fname,
          lastname: formValues.lname,
          email: formValues.email,
          password: formValues.password,
          avatar: avatarConfig,
        };
        const {data} = await axios.post(
          `${API_BASE_URL}/user/signup`,
          formData
        );
        alert(data.message);
        navigate("/login");
      } catch (error) {
        console.log(error);
        setErrorMessage(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
  };

  const handleConfirmPasswordChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if(formValues.password && formValues.password === value){
        setPasswordMatch("Matched");
    }else {
        setPasswordMatch("Password Not matched");
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage("");
    }, 9000);
    return () => clearInterval(interval);
  }, [errorMessage]);

  useEffect(() => {
       const isLoggedIn = localStorage.getItem("isLoggedIn");
       if(isLoggedIn) {
           navigate("/");
       }
  }, [navigate])

  return (
    <>
      <Header userInfo={""} authButton={"signup"} />
      <div className="auth-main">
        <div className="auth-container">
          <h1>Signup</h1>

          <div className="auth-form-container">
            {errorMessage ? (
              <div className="error-div">
                <p>{errorMessage}</p>
              </div>
            ) : null}
            <form onSubmit={handleFormSubmit}>
              <div className="form-div">
                <input
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  value={formValues.fname}
                  onChange={handleOnchange}
                  required
                />
              </div>
              <div className="form-div">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  value={formValues.lname}
                  onChange={handleOnchange}
                />
              </div>
              <div className="form-div">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formValues.email}
                  required
                  onChange={handleOnchange}
                />
              </div>
              <div className="form-div">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleOnchange}
                  required
                />
              </div>
              <div className="form-div">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="cpassword"
                  value={formValues.cpassword}
                  onChange={handleConfirmPasswordChange}
                  onFocus={() => setConformPasswordHasFocus(true)}
                  onBlur={() => setConformPasswordHasFocus(false)}
                  required
                />
              </div>
              {conformPasswordHasFocus && passwordMatch && (
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <h5 style={{color: passwordMatch === "Matched" ? "green": "black"}}>{passwordMatch}</h5>
                </div>
              )}
              <div className="form-div">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress sx={{ color: "white" }} size={"16px"} />
                  ) : (
                    "Signup"
                  )}
                </button>
              </div>
            </form>
            <div className="form-bottom">
              <h4>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "blue" }}>
                  Login
                </Link>
              </h4>
            </div>
            {/* <div className='form-bottom'>
                        <button onClick={handleGoogleLogin}>Signup with Google</button>
                    </div> */}
            <GoogleLoginPage hook={"signup"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
