import React, { useState } from "react";
import Board from "./Board";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ width: "100vh", height: "100vh" }}>
        <Board />
      </div>
    </div>
  );
}

export default App;
