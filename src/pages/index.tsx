import Task from "../models/Task";
import styles from "../styles/Home.module.scss"

export default function Home() {
  let task = Task.createPendingTask(1, "Lavar o carro");
  task = task.toggleStatus();
  return (
    <div className={styles.container}>
      <span>{task.id}</span>
      <span>{task.description}</span>
      <span>{task.isFinished ? "Concluída" : "Pendente"}</span>
    </div>
  );
}
