import { NextApiRequest, NextApiResponse } from "next";
import TaskDB from "../../../utils/models/TaskDB";
import User from "../../../utils/models/UserDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const task = await TaskDB.create(req.body);
      res.status(200).json({ Task: task });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else if (req.method === "PUT") {
    const { id, description, isFinished } = req.body;
    const task = await TaskDB.findById(id);

    if (!task) return res.status(400).json({ error: "Task not found" });
    await TaskDB.findOneAndUpdate(
      { _id: id },
      { description: description, isFinished: isFinished },
      { new: true }
    );
    res.status(200).json({ message: "Success" });
  } else if (req.method === "DELETE") {
    const { all, userId } = req.body;

    const user = await User.findById(userId);

    try {
      if (!user) res.status(400).json({ error: "User not found" });

      const tasks = await TaskDB.find({ userId, isFinished: all });

      const t = tasks.forEach(async task => {
        await TaskDB.deleteOne({ id: task.id }, { isFinished: true });
      });

      res.status(200).json({ message: "Success" });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else if (req.method === "GET") {
    const tasks = await TaskDB.find({ userId: req.query.userId });

    res.status(200).json({ tasks });
    // res.statusCode = 200;
    // res.json({
    //   tasks
    // })
  }
}
