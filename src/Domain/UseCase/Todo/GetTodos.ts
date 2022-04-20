import { Todo } from "../../Model/Todo";
import { TodoRepository } from "../../Repository/TodoRepository";

export interface GetTodosUseCase {
    invoke: () => Promise<Todo[]>

}

export class GetTodos implements GetTodosUseCase {
    private todoRepo: TodoRepository
    constructor(_todoRepo: TodoRepository) {
        this.todoRepo = _todoRepo;
    }

    async invoke() {
        return this.todoRepo.getTodos()
    }
}