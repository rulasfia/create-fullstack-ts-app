import { Task } from "@rulasfia/server/dto";
import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

const API_URL = "http://localhost:4000/api";

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + "/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h4>Server Data:</h4>
      <div>{isLoading ? "Loading..." : JSON.stringify(tasks, null, 2)}</div>
    </div>
  );
}

export default App;
