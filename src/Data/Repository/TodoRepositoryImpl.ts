import { Todo } from "../../Domain/Model/Todo";
import { TodoRepository } from "../../Domain/Repository/TodoRepository";
import TodoDataSource from "../DataSource/TodoDataSource";

export class TodoRepositoryImpl implements TodoRepository {
    dataSource: TodoDataSource;

    constructor(_datasource: TodoDataSource) {
        this.dataSource = _datasource;
    }

    async getTodos(): Promise<Todo[]> {
        return this.dataSource.getTodos();
    }
}