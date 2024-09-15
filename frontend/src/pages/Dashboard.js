import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, configAuth, getUserAuthInfo } from "../constants";
import axios from "axios";
import ViewTaskDialog from "../components/ViewTaskDialog";
import Loading from "../components/Loading";

function Dashboard() {
  const [tasks, setTasks] = useState({
     Todo: [],
          "In Progress": [],
          Done: [],
  });
  const [searchedTasks, setSearchedTasks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [viewTask, setViewTask] = useState({});
  const [sortBy, setSortBy] = useState("old");

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destinationCol = destination.droppableId;

    if (sourceCol === destinationCol && source.index === destination.index)
      return;

    const sourceTasks = Array.from(tasks[sourceCol]);
    const destinationTasks =
      sourceCol === destinationCol
        ? sourceTasks
        : Array.from(tasks[destinationCol]);

    const originalTasks = { ...tasks };

    const [removed] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [sourceCol]: sourceTasks,
      [destinationCol]: destinationTasks,
    });
    setSearchedTasks({
      ...tasks,
      [sourceCol]: sourceTasks,
      [destinationCol]: destinationTasks,
    });

    if (sourceCol !== destinationCol) {
      removed.status = destinationCol;
      const userInfo = getUserAuthInfo();
      try {
        setIsLoading(true);
        const { data } = await axios.put(
          `${API_BASE_URL}/task/update/${removed._id}`,
          JSON.stringify({ status: destinationCol }),
          configAuth(userInfo)
        );
      } catch (error) {
        console.error("Failed to update task status:", error);

        setTasks(originalTasks);
        setSearchedTasks(originalTasks);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchTasks = async () => {
    const userInfo = getUserAuthInfo();
    if (userInfo) {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/task`,
          configAuth(userInfo)
        );
        data.map((d) => {
          const date = new Date(d.createdAt);
          const createdDate = date.toDateString().split(" ");
          const createdTime = date.toLocaleTimeString().split(":");
          const ampm = date.toLocaleTimeString().split(" ")[1];
          d.date = `${createdDate[2]} ${createdDate[1]} ${createdDate[3]}`; // setting created date
          d.time = `${
            createdTime[0] < 10 ? "0" + createdTime[0] : createdTime[0]
          }:${createdTime[1]} ${ampm.toUpperCase()}`; // setting created time
        });

        const groupedTasks = {
          Todo: [],
          "In Progress": [],
          Done: [],
        };

        data.forEach((task) => {
          const { status, ...rest } = task;
          groupedTasks[status].push(rest);
        });
        setTasks(groupedTasks);
        setSearchedTasks(groupedTasks);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirm = window.confirm("Are you sure want to delete this Task?");
    const userInfo = getUserAuthInfo();
    if (confirm) {
      setIsLoading(true);
      try {
        const { data } = await axios.delete(
          `${API_BASE_URL}/task/${taskId}`,
          configAuth(userInfo)
        );
        setIsLoading(true);
        alert(data.message);
        fetchTasks();
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const searchTaskByTitle = (tasks, searchTitle) => {
    const result = {};

    for (const key in tasks) {
      result[key] = tasks[key].filter((task) =>
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setSearchedTasks(result);
  };

  const handleSortChange = (tasks, value) => {
    setSortBy(value);
    const sortedTasks = {};

    for (const key in tasks) {
      sortedTasks[key] = tasks[key].sort((a, b) => {
        const dateTimeA = new Date(`${a.date} ${a.time}`);
        const dateTimeB = new Date(`${b.date} ${b.time}`);

        if (value === "recent") {
          return dateTimeB - dateTimeA; // Latest to Oldest
        } else {
          return dateTimeA - dateTimeB; // Oldest to Latest
        }
      });
    }

    setSearchedTasks(sortedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(tasks);

  return (
    <div className="App">
      <div className="addtask-button-container">
        <button onClick={() => navigate("/task/create")}>Add Task</button>
      </div>
      <div className="search-sort-container">
        <div className="search-container">
          <h3>Search:</h3>
          <input
            type="text"
            placeholder="search..."
            onChange={(e) => searchTaskByTitle(tasks, e.target.value)}
          />
        </div>
        <div className="sort-container">
          <h3>Sort By:</h3>
          <select
            onChange={(e) => handleSortChange(tasks, e.target.value)}
            value={sortBy}
          >
            <option value={"recent"}>Recent</option>
            <option value={"old"}>Old</option>
          </select>
        </div>
      </div>
      {isLoading ? <Loading /> : 
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {Object.entries(searchedTasks).map(([columnId, columnTasks]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  className="column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2>{columnId.toUpperCase()}</h2>
                  {columnTasks.length > 0 ? (
                    columnTasks.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h3>{task.title}</h3>
                            <h5>{task.description}</h5>
                            <p>
                              Created at: {task.date}, {task.time}
                            </p>
                            <div className="operation-buttons">
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteTask(task._id)}
                              >
                                Delete
                              </button>
                              <button
                                className="edit-btn"
                                onClick={() =>
                                  navigate(`/task/edit/${task._id}`)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="view-btn"
                                onClick={() => {
                                  setViewTask({
                                    title: task.title,
                                    description: task.description,
                                    created: `Created At: ${task.date}, ${task.time}`,
                                  });
                                  setOpen(true);
                                }}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="no-tasks">
                      <p>No tasks</p>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
       }
      {open ? (
        <ViewTaskDialog open={open} setOpen={setOpen} viewTask={viewTask} />
      ) : null}
    </div>
  );
}

export default Dashboard;
