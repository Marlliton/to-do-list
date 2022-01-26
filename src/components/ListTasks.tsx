import Task from "../models/Task";
import { ToDoList } from "../models/ToDoList";
import styles from "../styles/ListTasks.module.scss";
import { FooterList } from "./FooterList";
import { Li } from "./Li";

type ListProps = {
  tasks: ToDoList;
  onChange: (tasks: ToDoList, task: Task) => void;
  filter: (tasks: ToDoList) => void;
  deleteCompletedTasks: () => void;
};

export function ListTasks(props: ListProps) {
  const renderTasks = () => {
    return props.tasks?.items.map(task => {
      return (
        <Li
          key={task.id}
          description={task.description}
          isFinished={task.isFinished}
          toggleStatus={async () => {
            const modifiedTask = task.toggleStatus();
            const newList = props.tasks.modifyTasks(modifiedTask);

            props.onChange(newList, modifiedTask);
          }}
        />
      );
    });
  };
  return (
    <div className={styles.container}>
      <ul>
        {renderTasks()}
        <FooterList
          deleteCompletedTasks={props.deleteCompletedTasks}
          filter={props.filter}
          tasks={props.tasks}
        />
      </ul>
    </div>
  );
}
