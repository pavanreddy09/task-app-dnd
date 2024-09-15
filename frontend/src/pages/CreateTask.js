import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskForm from "../components/taskform";
import { Tooltip } from "@mui/material";
import { API_BASE_URL, configAuth, getUserAuthInfo } from "../constants";

function CreateTask() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "Todo",
  });

  const [isLoading, setIsLoading] = useState(false);

  // create task function
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formValues.title) {
      return alert("Please Enter the Title");
    }
    const userInfo = getUserAuthInfo();
    if (userInfo) {
      setIsLoading(true);
      await axios
        .post(
          `${API_BASE_URL}/task/create`,
          {
            title: formValues.title,
            description: formValues.description,
            status: formValues.status,
            email: JSON.parse(userInfo).email,
          },
          configAuth(userInfo)
        )
        .then(function (response) {
          alert("Task is Created SuccesFully!");
          setIsLoading(false);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data.message);
          setIsLoading(false);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="taskform">
      <div className="span">
        <Tooltip title="Back">
          <ArrowBackIcon
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Tooltip>
        <span aria-label="title-create">Create a Task</span>
      </div>
      <TaskForm
        formValues={formValues}
        setFormValues={setFormValues}
        handleOnSubmit={handleCreateTask}
        isLoading={isLoading}
        buttonText={"Create"}
      />
    </div>
  );
}

export default CreateTask;