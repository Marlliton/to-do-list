import Task from "./Task";

enum Filter {
  NONE,
  FINISHED,
  PENDING,
}

export class ToDoList {
  #all: Task[];
  #usedFilter: Filter;

  constructor(all: Task[], usedFilter = Filter.NONE) {
    this.#all = all;
    this.#usedFilter = usedFilter;
  }

  get items() {
    return this.applyFilter(this.#all);
  }

  get usedFilter() {
    return this.#usedFilter;
  }

  deleteAllCompleted(): ToDoList {
    const all = this.#all.filter(task => !task.isFinished);

    return new ToDoList(all, Filter.NONE);
  }

  showAll(): boolean {
    return this.#usedFilter === Filter.NONE;
  }

  showFinishedTasks(): boolean {
    return this.#usedFilter === Filter.FINISHED;
  }

  showPendingTasks(): boolean {
    return this.#usedFilter === Filter.PENDING;
  }

  filterNone(): ToDoList {
    return new ToDoList(this.#all, Filter.NONE);
  }

  filterFinished(): ToDoList {
    return new ToDoList(this.#all, Filter.FINISHED);
  }

  filterPending(): ToDoList {
    return new ToDoList(this.#all, Filter.PENDING);
  }

  private applyFilterPending(tasks: Task[]): Task[] {
    return tasks.filter(task => !task.isFinished);
  }

  private applyFilterFinished(tasks: Task[]): Task[] {
    return tasks.filter(task => task.isFinished);
  }

  applyFilter(tasks: Task[]): Task[] {
    if (this.showPendingTasks()) {
      return this.applyFilterPending(tasks);
    } else if (this.showFinishedTasks()) {
      return this.applyFilterFinished(tasks);
    } else {
      return [...tasks];
    }
  }
  modifyTasks(taskModified: Task): ToDoList {
    const all = this.#all.map(task => {
      return task.id === taskModified.id ? taskModified : task;
    });

    return new ToDoList(all, this.#usedFilter);
  }
}
