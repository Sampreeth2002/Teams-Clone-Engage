import React, { useState, useEffect, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import firebase from "firebase";
import { db } from "../../Services/firebase";
import { AuthContext } from "../../Context/AuthContext";
import TodoItem from "./TodoItem";
import "./Todos.css";

function Todos() {
  const [todoInput, setTodoInput] = useState("");
  const [username, setUsername] = useState("");
  const [todos, setTodos] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setUsername(authContext.user.username);
  }, []);

  useEffect(() => {
    setTodos([]);
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          isInProgress: doc.data().isInProgress,
          username: doc.data().username,
        }))
      );
    });
  }, [username]);

  // const getTodos = () => {

  // };

  const addTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      username: username,
      isInProgress: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  };

  return (
    <div className="todos_container">
      <div className="todos">
        <h1>{username} Tasks List</h1>
        <form>
          <TextField
            id="standard-basic"
            label="Write a Task"
            value={todoInput}
            style={{ width: "90vw", maxWidth: "500px" }}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: "none" }}
          >
            Default
          </Button>
        </form>

        <div className="todoList">
          {todos.map((todo) => (
            <TodoItem
              todo={todo.todo}
              id={todo.id}
              isInProgress={todo.isInProgress}
              checkUser={todo.username === username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todos;
