import { Todo } from "../../Domain/Model/Todo";
import { TodoRepository } from "../../Domain/Repository/TodoRepository";
import TodoDataSource from "../DataSource/TodoDataSource";

export class TodoRepositoryImpl implements TodoRepository {
    dataSource: TodoDataSource;

    constructor(_datasource: TodoDataSource) {
        this.dataSource = _datasource;
    }

    async createTodo(value: string): Promise<Todo> {
        return this.dataSource.createTodo(value)
    }

    async getTodos(): Promise<Todo[]> {
        return this.dataSource.getTodos();
    }

    async markAsRead(id: string) {
        return this.dataSource.markTodoAsRead(id)
    }
}