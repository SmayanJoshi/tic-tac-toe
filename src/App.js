import React, { useState } from "react";
import Board from "./Board";

function App() {
  const [size, setSize] = useState(3);
  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "green"
        }}
      >
        <h1>Tic Tac Toe</h1>
        <span>Size </span>
        <input
          type="number"
          value={size}
          min={3}
          onChange={event => setSize(parseInt(event.target.value))}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px"
        }}
      >
        <div style={{ width: "70vh", height: "70vh" }}>
          <Board size={size} />
        </div>
      </div>
    </>
  );
}

export default App;
