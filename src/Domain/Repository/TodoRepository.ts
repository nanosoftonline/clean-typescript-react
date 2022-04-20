import { Todo } from "../Model/Todo";

export interface TodoRepository {
    getTodos(): Promise<Todo[]>;
}