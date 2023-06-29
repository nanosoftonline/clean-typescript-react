import { useEffect } from "react";
import useViewModel from "./TodoListViewModel";
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { toast } from "react-toastify";

export default function TodoListView() {
  const { getTodos, createTodo, onChangeValue, toggleRead, value, todos } = useViewModel();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <List>
      <input
        onChange={onChangeValue}
        placeholder="add your todo"
        type="text"
        value={value}
      />
      <button
        onClick={
            createTodo}
      >
        enviar
      </button>
      {todos.map((todo, i) => {
        return (
          <ListItem key={i}>
            <ListItemIcon>
              <Checkbox checked={todo.isComplete} onChange={() => toggleRead(todo.id)}  />
            </ListItemIcon>
            <ListItemText primary={todo.title} />
          </ListItem>
        );
      })}
    </List>
  );
}
