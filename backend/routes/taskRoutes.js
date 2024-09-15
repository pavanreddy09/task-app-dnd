const express = require("express");
const {
  createTask,
  getTasks,
  updateStatus,
  updateTask,
  getTask,
  deleteTask,
} = require("../controllers/taskController");
const { verifyJWTToken } = require("../helpers/authHelpers");
const { validateTask } = require("../utils/validator");

const router = express.Router();

router.route("/").get(verifyJWTToken, getTasks);
router.route("/create").post(verifyJWTToken, validateTask, createTask);
router.route("/update/:id").put(verifyJWTToken, updateStatus);
router
  .route("/:id")
  .get(verifyJWTToken, getTask)
  .put(verifyJWTToken, validateTask, updateTask)
  .delete(verifyJWTToken, deleteTask);

module.exports = router;
