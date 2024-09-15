import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";
import PageLayout from "./layout/PageLayout";
import Pagenotfound from "./components/Pagenotfound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<PageLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task/create" element={<CreateTask />} />
            <Route path="/task/edit/:id" element={<UpdateTask />} />
          </Route>
          <Route path="*" element={<Pagenotfound />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
