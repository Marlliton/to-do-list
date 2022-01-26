import mongoose from "../database";

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});

const TaskDB = mongoose.models["TaskDB"]
  ? mongoose.model("TaskDB")
  : mongoose.model("TaskDB", TaskSchema);

export default TaskDB;
