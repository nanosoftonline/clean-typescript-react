import { useState } from "react";
import TodoAPIDataSourceImpl from "../../../Data/DataSource/API/TodoAPIDataSource";
import { TodoRepositoryImpl } from "../../../Data/Repository/TodoRepositoryImpl";
import { Todo } from "../../../Domain/Model/Todo";
import { GetTodos } from "../../../Domain/UseCase/Todo/GetTodos";
import { CreateTodo } from "../../../Domain/UseCase/Todo/CreateTodo";
import { ToggleCheckTodo } from "../../../Domain/UseCase/Todo/ToggleCheckTodo";
import { RemoveTodo } from "../../../Domain/UseCase/Todo/RemoveTodo";
import { toast } from "react-toastify";

export default function TodoListViewModel() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");

  const todosDataSourceImpl = new TodoAPIDataSourceImpl();
  const todosRepositoryImpl = new TodoRepositoryImpl(todosDataSourceImpl);

  const getTodosUseCase = new GetTodos(todosRepositoryImpl);
  const createTodosUseCase = new CreateTodo(todosRepositoryImpl);
  const toggleCheckTodoUseCase = new ToggleCheckTodo(todosRepositoryImpl);
  const removeTodosUseCase = new RemoveTodo(todosRepositoryImpl);

  function _resetValue() {
    setValue("");
  }

  async function getTodos() {
    setTodos(await getTodosUseCase.invoke());
  }

  async function createTodo() {
    try {
      const createdTodo = await createTodosUseCase.invoke(value);
      setTodos((prev) => [...prev, createdTodo]);
      _resetValue();
    } catch (e) {
      _resetValue();
      if (e instanceof Error) {
        toast(e.message);
      }
    }
  }

  async function toggleRead(id: string) {
    const createdTodo = await toggleCheckTodoUseCase.invoke(id);
    setTodos((prev) => [
      ...prev.map((i) => {
        const isToggled = i.id === id;

        return {
          ...i,
          isComplete: isToggled ? createdTodo : i.isComplete,
        };
      }),
    ]);
  }

  async function removeTodo(id: string) {
    const isRemoved = await removeTodosUseCase.invoke(id);
    if (isRemoved) {
      setTodos((prev) => {
        return [...prev.filter((i) => i.id !== id)];
      });
    }
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
    removeTodo,
    todos,
    value,
  };
}
