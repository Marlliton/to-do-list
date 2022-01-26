import { ToDoList } from "../models/ToDoList";
import styles from "../styles/Footer.module.scss";
import { Button } from "./Button";

type FooterProps = {
  tasks: ToDoList;
  filter: (tasks: ToDoList) => void;
  deleteCompletedTasks: () => void;
};

export function FooterList(props: FooterProps) {
  function renderTotalTasks() {
    return <div>{props.tasks?.items.length} Tarefas encontradas</div>;
  }

  function renderButtonFilters() {
    return (
      <div>
        <Button
          onClick={() => props.filter(props.tasks.filterNone())}
          buttonFilter="filter"
          isActive={props.tasks?.showAll()}
        >
          Todas
        </Button>

        <Button
          onClick={() => props.filter(props.tasks.filterPending())}
          buttonFilter="filter"
          isActive={props.tasks?.showPendingTasks()}
        >
          Pendentes
        </Button>

        <Button
          onClick={() => props.filter(props.tasks.filterFinished())}
          buttonFilter="filter"
          isActive={props.tasks?.showFinishedTasks()}
        >
          Concluídas
        </Button>
      </div>
    );
  }

  function renderDeleteCompletedTasks() {
    return (
      <div>
        <Button
          buttonFilter="delete"
          onClick={() => {
            props.filter(props.tasks.deleteAllCompleted());
            props.deleteCompletedTasks()
          }}
        >
          Apagar Concluídas
        </Button>
      </div>
    );
  }

  return (
    <li className={styles.container}>
      {renderTotalTasks()}
      {renderButtonFilters()}
      {renderDeleteCompletedTasks()}
    </li>
  );
}
