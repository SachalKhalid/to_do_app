import React, { useState } from "react";
import axios from "axios";
import $ from "jquery";

const Table = ({ todos, setTodos, isLoading, fetchData }) => {
  const [editedTodo, setEditedTodo] = useState({
    id: null,
    body: "",
    completed: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      const { id, body, completed } = editedTodo;
      console.log(id);
      // Update the todo with the edited body
      await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, { body });

      setEditedTodo({
        id: null,
        body: "",
        completed: false,
      });

      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckBox = async (id, completed) => {
    // If the completed status has changed, update it separately
    if (completed !== undefined) {
      await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, {
        completed: !completed,
      });
    }
    fetchData();
  };
  const handleEditButton = (id, body, completed) => {
    setEditedTodo({
      id,
      body,
      completed,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Checkbox</th>
            <th>To Do</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            todos.map((todoItem, index) => (
              <tr key={index}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={todoItem.completed}
                      onChange={() =>
                        handleCheckBox(todoItem.id, todoItem.completed)
                      }
                    />
                  </div>
                </td>
                <td>{todoItem.body}</td>
                <td>{todoItem.completed ? "Done" : "Uncompleted"}</td>
                <td>{todoItem.created}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      handleEditButton(
                        todoItem.id,
                        todoItem.body,
                        todoItem.completed
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(todoItem.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Bootstrap Modal for Edit */}
      <div
        className={`modal ${isModalOpen ? "show" : ""}`}
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden={!isModalOpen}
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Todo</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="editedTodoBody">Todo:</label>
              <input
                type="text"
                id="editedTodoBody"
                className="form-control"
                value={editedTodo.body}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, body: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
