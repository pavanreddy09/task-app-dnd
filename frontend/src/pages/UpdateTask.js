import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskForm from "../components/taskform";
import { Tooltip } from "@mui/material";
import { API_BASE_URL, configAuth, getUserAuthInfo } from "../constants";

function UpdateTask() {
    const [formValues, setFormValues] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const { id } = useParams();
    const navigate = useNavigate();
  
    // fetch todo function
    const fetchTodo = async () => {
      setIsLoading(true);
      const userInfo = getUserAuthInfo();
  
      if (userInfo) {
        try {
          const { data } = await axios.get(
            `${API_BASE_URL}/task/${id}`,
            configAuth(userInfo)
          );
          console.log(data);
          setFormValues(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        navigate("/login");
      }
    };
  
    // update a task function
    const handleTaskUpdate = async (e) => {
      e.preventDefault();
      if (!formValues.title) {
        return alert("Please Enter the Title");
      }
      const userInfo = getUserAuthInfo();
      setIsLoading(true);
      await axios
        .put(
          `${API_BASE_URL}/task/${id}`,
          {
            title: formValues.title,
            description: formValues.description,
            status: formValues.status,
          },
          configAuth(userInfo)
        )
        .then((response) => {
          alert(response.data.message);
          setIsLoading(false);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data.message);
          setIsLoading(false);
        });
    };
  
    useEffect(() => {
      fetchTodo();
    }, [id]);
  

  return (
    <div className="taskform">
      <div className="span">
        <Tooltip title="Back">
          <ArrowBackIcon
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Tooltip>
        <span aria-label="title-create">Edit a Task</span>
      </div>
      <TaskForm
        formValues={formValues}
        setFormValues={setFormValues}
        handleOnSubmit={handleTaskUpdate}
        isLoading={isLoading}
        buttonText={"Edit"}
      />
    </div>
  );
}

export default UpdateTask;