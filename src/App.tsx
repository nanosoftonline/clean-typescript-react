import React from "react";
import "./App.css";
import TodoListView from "./Presentation/Todo/TodoList/TodoListView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <TodoListView />
    </div>
  );
}

export default App;
