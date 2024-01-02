import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TodoForm } from "./components/TodoForm";
import Table from "./components/table";
import axios from "axios";
function App() {
  const [todos, setTodos] = useState([]);
  const [isloding, setIsloding] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      setTodos(response.data);
      setIsloding(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-secondary min-vh-100">
        <nav>
          <h1 className="text-5xl text-center text-white">TODO APP</h1>
        </nav>

        <TodoForm setTodos={setTodos} fetchData={fetchData} />
        <Table
          todos={todos}
          setTodos={setTodos}
          isloding={isloding}
          fetchData={fetchData}
        />
      </div>
    </>
  );
}

export default App;
