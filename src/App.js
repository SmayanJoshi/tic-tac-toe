import React, { useState } from "react";
import Board from "./Board";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(prop => ({
  header: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "green"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  },
  boardContainer: { width: "70vh", height: "70vh" }
}));

function App() {
  const classes = useStyles();
  const [size, setSize] = useState(3);
  return (
    <>
      <div className={classes.header}>
        <h1>Tic Tac Toe</h1>
        <span>Size </span>
        <input
          type="number"
          value={size}
          min={3}
          onChange={event => setSize(parseInt(event.target.value))}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.boardContainer}>
          <Board size={size} />
        </div>
      </div>
    </>
  );
}

export default App;
