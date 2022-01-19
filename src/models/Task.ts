export default class Task {
  #id: number;
  #description: string;
  #isFinished: boolean;

  constructor(id: number, description: string, isFinished = false) {
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

  static createPendingTask(id: number, description: string): Task {
    return new Task(id, description);
  }

  static createFinishedTask(id: number, description: string): Task {
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
