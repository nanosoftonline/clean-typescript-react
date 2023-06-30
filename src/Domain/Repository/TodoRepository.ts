import { Todo } from "../Model/Todo";

export interface TodoRepository {
  getTodos(): Promise<Todo[]>;
  createTodo(value: string): Promise<Todo>;
  markAsRead(id: string): Promise<boolean>;
  removeTodo(id: string): Promise<boolean>;
}
