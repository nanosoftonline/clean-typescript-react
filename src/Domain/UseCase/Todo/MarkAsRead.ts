import { TodoRepository } from "../../Repository/TodoRepository";

export interface MarkAsReadUseCase {
  invoke: (id: string) => Promise<boolean>;
}

export class MarkAsRead implements MarkAsReadUseCase {
  private todoRepo: TodoRepository;
  constructor(_todoRepo: TodoRepository) {
    this.todoRepo = _todoRepo;
  }

  async invoke(id: string) {
    return this.todoRepo.markAsRead(id);
  }
}
