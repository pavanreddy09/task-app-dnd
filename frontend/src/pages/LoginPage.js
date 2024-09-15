import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../components/Header";
import GoogleLoginPage from "../components/GoogleLogin";
import { API_BASE_URL } from "../constants";

function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    if (!formValues.email) {
      alert("Email is Required");
      return;
    }
    if (!formValues.password) {
      alert("Password is Required");
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${API_BASE_URL}/user/login`,
        {
          email: formValues.email,
          password: formValues.password,
        }
      );
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      <Header userInfo={""} authButton={"login"} />
      <div className="auth-main">
        <div className="auth-container">
          <h1>Login</h1>

          <div className="auth-form-container">
            {errorMessage ? (
              <div className="error-div">
                <p>{errorMessage}</p>
              </div>
            ) : null}
            <form onSubmit={handleFormSubmit}>
              <div className="form-div">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleOnchange}
                  required
                />
              </div>
              <div className="form-div">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleOnchange}
                  required
                />
              </div>
              <div className="form-div">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress sx={{ color: "white" }} size={"16px"} />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <div className="form-bottom">
              <h4>
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "blue" }}>
                  Signup
                </Link>
              </h4>
            </div>
            {/* <div className='form-bottom'>
                        <button>Login with Google</button>
                 </div> */}
            <GoogleLoginPage hook={"login"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
