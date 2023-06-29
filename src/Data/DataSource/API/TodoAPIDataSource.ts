import { Todo } from "../../../Domain/Model/Todo";
import TodoDataSource from "../TodoDataSource";
import { TodoAPIEntity } from "./Entity/TodoAPIEntity";
import localDB from "./LocalDB";

export default class TodoAPIDataSourceImpl implements TodoDataSource {
  db = localDB<TodoAPIEntity>("todos");
  async createTodo(value: string) {
    const res: Todo = {
      id: new Date().getSeconds().toString(),
      isComplete: false,
      title: value,
    };

    this.db.create({
      id: res.id,
      is_completed: res.isComplete,
      title: res.title,
    });
    return res;
  }

  async getTodos(): Promise<Todo[]> {
    const data = this.db?.getAll();

    return data?.map((item) => ({
      id: item.id,
      title: item.title,
      isComplete: item.is_completed,
    }));
  }
}
