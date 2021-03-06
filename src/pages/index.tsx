import axios from "axios";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ListTasks } from "../components/ListTasks";
import { useAuth } from "../hooks/useAuth";
import Task from "../models/Task";
import { ToDoList } from "../models/ToDoList";
import styles from "../styles/App.module.scss";

const baseUrl = "http://localhost:3000/api/task/";

export default function Home() {
  const { isAuthenticate, user } = useAuth();
  const [tasks, setTasks] = useState<ToDoList>(null);
  useEffect(() => {
    getTasks();
  }, []);

  const createNewTask = async (description: string) => {
    await axios.post(baseUrl, {
      userId: user?.id,
      description: description,
    });

    getTasks();
  };

  function getTasks() {
    axios
      .get(baseUrl, { params: { userId: user?.id } })
      .then(response => response.data)
      .then(data => Array.from(data["tasks"]))
      .then(result =>
        result.map(
          task => new Task(task["_id"], task["description"], task["isFinished"])
        )
      )
      .then(list => new ToDoList(list))
      .then(setTasks);
  }

  async function onChange(tasks: ToDoList, task: Task) {
    await axios.put(baseUrl, {
      id: task.id,
      description: task.description,
      isFinished: task.isFinished,
    });

    setTasks(tasks);
  }

  async function deleteCompletedTasks() {
    await axios.delete(baseUrl, {
      data: {
        userId: user?.id,
        all: true,
      },
    });
  }

  return (
    <div className={styles.container}>
      <Header onChange={description => createNewTask(description)} />
      <ListTasks
        deleteCompletedTasks={deleteCompletedTasks}
        filter={setTasks}
        tasks={tasks}
        onChange={onChange}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const token = ctx.req.headers.cookie;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
