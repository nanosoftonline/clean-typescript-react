import { useEffect } from "react";
import useViewModel from "./TodoListViewModel";
import {
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
} from "@mui/material";

export default function TodoListView() {
    const { getTodos, todos } = useViewModel();

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <List>
            {todos.map((todo, i) => {
                return (
                    <ListItem key={i}>
                        <ListItemIcon>
                            <Checkbox checked={todo.isComplete} />
                        </ListItemIcon>
                        <ListItemText primary={todo.title} />
                    </ListItem>
                );
            })}
        </List>
    );
}