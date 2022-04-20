
import { Todo } from "../../Domain/Model/Todo";

export default interface TodoDataSource {
    getTodos(): Promise<Todo[]>;
}