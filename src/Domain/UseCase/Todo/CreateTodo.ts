import { Todo } from "../../Model/Todo";
import { TodoRepository } from "../../Repository/TodoRepository";

export interface CreateTodosUseCase {
  invoke: (value: string) => Promise<Todo>;
}

export class CreateTodo implements CreateTodosUseCase {
  private todoRepo: TodoRepository;
  constructor(_todoRepo: TodoRepository) {
    this.todoRepo = _todoRepo;
  }

  async invoke(value: string) {
    if (value.length < 2) {
      throw new Error(
        "Your todo should have at leat 2 characters."
      );
    }
    const created = this.todoRepo.createTodo(value);
    return created;
  }
}
