import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Avatar from "react-nice-avatar";
import { useNavigate } from "react-router-dom";
import { Avatar as Pimage } from '@mui/material';


function Header({ userInfo, authButton = '' }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header>
      <div>
        <CalendarMonthIcon sx={{ color: "white" }} />
      </div>
      {userInfo && (
        <div className="profile-info">
          <div className="avatar">
            <h3 aria-label="profile-name" style={{ color: "white" }}>
              {userInfo.firstname}
            </h3>

           {userInfo?.avatar && (<Avatar
              style={{ width: "38px", height: "38px" }}
              {...userInfo.avatar}
              className="avatar-icon"
              aria-label="profile-icon"
            />)}
            {userInfo?.image ? <Pimage src={`${userInfo.image}`} sx={{ width: "38px", height: "38px" }}/> : null}

          </div>
          <div>
            <button
              className="logout-btn"
              onClick={handleLogout}
              aria-label="logout"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {authButton && (
        <div>
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
            aria-label="login"
            style={{
              backgroundColor: authButton === "login" ? "white" : "inherit",
              border: authButton === "login" ? "none" : "1px solid white",
              color: authButton === "login" ? "inherit" : 'white'
            }}
          >
            Login
          </button>
          <button
            className="signup-btn"
            onClick={() => navigate('/signup')}
            aria-label="login"
            style={{
                backgroundColor: authButton === "signup" ? "white" : "inherit",
                border: authButton === "signup" ? "none" : "1px solid white",
                color: authButton === "signup" ? "inherit" : 'white'
              }}
          >
            Signup
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
