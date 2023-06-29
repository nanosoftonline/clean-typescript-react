import { Todo } from "../../../Domain/Model/Todo";
import TodoDataSource from "../TodoDataSource";
import { TodoAPIEntity } from "./Entity/TodoAPIEntity";
interface TypedResponse<T = any> extends Response {
    json<P = T>(): Promise<P>;
}
export default class TodoAPIDataSourceImpl implements TodoDataSource {
    db: TodoAPIEntity[] = [{
        id: 1,
        title: 'titulo qualquer',
        completed: false,
    },
    {
        id: 2,
        title: 'segundo todo',
        completed: false,
    },
    {
        id: 3,
        title: 'terceiro todo',
        completed: false,
    }
]
    
    async createTodo(value: string) {
        const res: Todo = {
            id: new Date().getSeconds(),
            isComplete: false,
            title: value
        }

        this.db.push({
            id: res.id,
            completed: res.isComplete,
            title: res.title
        })
    return res
    }

    async getTodos(): Promise<Todo[]> {
        const data = this.db
        return data.map((item) => ({
            id: item.id,
            title: item.title,
            isComplete: item.completed,
        }));
    }
}