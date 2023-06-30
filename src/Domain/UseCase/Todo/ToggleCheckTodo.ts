import { TodoRepository } from "../../Repository/TodoRepository";

export interface ToggleCheckTodoUseCase {
  invoke: (id: string) => Promise<boolean>;
}

export class ToggleCheckTodo implements ToggleCheckTodoUseCase {
  private todoRepo: TodoRepository;
  constructor(_todoRepo: TodoRepository) {
    this.todoRepo = _todoRepo;
  }

  async invoke(id: string) {
    return this.todoRepo.markAsRead(id);
  }
}
