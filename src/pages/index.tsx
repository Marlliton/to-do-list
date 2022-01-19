import Task from "../models/Task";
import { ToDoList } from "../models/ToDoList";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const list = [
    Task.createPendingTask(1, " Lavar o carro"),
    Task.createFinishedTask(2, " Estudar react"),
    Task.createPendingTask(4, " Estudar regex"),
  ];

  let tasks = new ToDoList(list);
  tasks = tasks.filterFinished();
  tasks = tasks.filterNone();

  function renderTasks() {
    return tasks.items.map(task => {
      return (
        <div key={task.id}>
          <span>{task.id}</span>
          <span>{task.description}</span>
          <span>{task.isFinished ? " Concluída" : " Pendente"}</span>
        </div>
      );
    });
  }
  return (
    <div className={styles.container}>
      {renderTasks()}
      {console.log(tasks)}
    </div>
  );
}
