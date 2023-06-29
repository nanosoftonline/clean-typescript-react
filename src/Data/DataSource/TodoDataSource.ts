
import { Todo } from "../../Domain/Model/Todo";

export default interface TodoDataSource {
    getTodos(): Promise<Todo[]>;
    createTodo(value: string): Promise<Todo>;
    markTodoAsRead(id: string): Promise<boolean>
}