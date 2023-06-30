import { Todo } from "../../Domain/Model/Todo";

export default interface TodoDataSource {
  getTodos(): Promise<Todo[]>;
  createTodo(value: string): Promise<Todo>;
  toggleTodoCheck(id: string): Promise<boolean>;
  removeTodo(id: string): Promise<boolean>;
}
