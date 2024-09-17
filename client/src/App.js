import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/messages")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  console.log(message)

  return (
    <div className="App">
      <h1>I am working!</h1>
      <h1>{message}</h1>

    </div>
  );
}

export default App;
