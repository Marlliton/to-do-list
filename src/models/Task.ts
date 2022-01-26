export default class Task {
  #id: string;
  #description: string;
  #isFinished: boolean;

  constructor(id: string, description: string, isFinished = false) {
    this.#id = id;
    this.#description = description;
    this.#isFinished = isFinished;
  }

  get id() {
    return this.#id;
  }

  get description() {
    return this.#description;
  }

  get isFinished() {
    return this.#isFinished;
  }

  static createPendingTask(id: string, description: string): Task {
    return new Task(id, description);
  }

  static createFinishedTask(id: string, description: string): Task {
    return new Task(id, description, true);
  }

  toggleStatus() {
    return this.#isFinished ? this.switchToPending() : this.switchToFinished();
  }

  private switchToPending() {
    return Task.createPendingTask(this.#id, this.#description);
  }

  private switchToFinished() {
    return Task.createFinishedTask(this.#id, this.#description);
  }

  
}
