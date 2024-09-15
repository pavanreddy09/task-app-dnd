import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

function PageLayout() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header userInfo={userInfo} />
          <Outlet />
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}

export default PageLayout;
