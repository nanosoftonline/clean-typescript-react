import { Todo } from "../../Model/Todo";
import { TodoRepository } from "../../Repository/TodoRepository";

export interface CreateTodosUseCase {
    invoke: (value: string) => Promise<Todo>
}

export class CreateTodo implements CreateTodosUseCase {
    private todoRepo: TodoRepository
    constructor(_todoRepo: TodoRepository) {
        this.todoRepo = _todoRepo;
    }

    async invoke(value: string) {
        console.log('run here')
        if (value.length < 10) {
            console.log('RUN')
            throw new Error("You need to pass at leat 10 characters to create a todo.")
        }
        const created = this.todoRepo.createTodo(value)
        return created
    }
}  