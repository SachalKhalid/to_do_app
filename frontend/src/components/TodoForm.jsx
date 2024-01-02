import axios from "axios";
import React, { useState } from "react";

export const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));

    console.log(newTodo);
  };

  const postTodo = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/todo/", newTodo);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a new todo"
            onChange={handleChange}
            value={newTodo.body}
          />
        </div>
        <button className="btn btn-success" onClick={postTodo}>
          ADD TODO
        </button>
      </div>
    </>
  );
};
