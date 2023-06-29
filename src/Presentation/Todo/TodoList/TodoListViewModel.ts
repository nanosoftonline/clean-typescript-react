import { useState } from "react";
import TodoAPIDataSourceImpl from "../../../Data/DataSource/API/TodoAPIDataSource";
import { TodoRepositoryImpl } from "../../../Data/Repository/TodoRepositoryImpl";
import { Todo } from "../../../Domain/Model/Todo";
import { GetTodos } from "../../../Domain/UseCase/Todo/GetTodos";
import { CreateTodo } from "../../../Domain/UseCase/Todo/CreateTodo";
import { toast } from "react-toastify";
import { MarkAsRead } from "../../../Domain/UseCase/Todo/MarkAsRead";

export default function TodoListViewModel() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");

  const todosDataSourceImpl = new TodoAPIDataSourceImpl();
  const todosRepositoryImpl = new TodoRepositoryImpl(todosDataSourceImpl);
  const GetTodosUseCase = new GetTodos(todosRepositoryImpl);

  const CreateTodosUseCase = new CreateTodo(todosRepositoryImpl);
  const MarkAsReadUseCase = new MarkAsRead(todosRepositoryImpl);


  function _resetValue() {
    setValue("");
  }

  async function getTodos() {
    setTodos(await GetTodosUseCase.invoke());
  }

  async function createTodo() {
    try {
      const createdTodo = await CreateTodosUseCase.invoke(value);
      setTodos((prev) => [...prev, createdTodo]);
      _resetValue();
    } catch (e) {
        _resetValue();
        if(e instanceof Error) {
            toast(e.message);
        }
    }
  }

  async function toggleRead(id: string) {
    const createdTodo = await MarkAsReadUseCase.invoke(id);
    setTodos((prev) => [...prev.map((i) => {
      const isToggled = i.id === id

      return {
        ...i,
        isComplete: isToggled ? createdTodo: i.isComplete
      }
    }) ]);
  }

  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setValue(e.target.value);
  }

  return {
    getTodos,
    onChangeValue,
    createTodo,
    toggleRead,
    todos,
    value,
  };
}
