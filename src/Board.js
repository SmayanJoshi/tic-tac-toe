import React from "react";
import Cell from "./Cell";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(prop => ({
  board: props => ({
    display: "grid",
    gridColumnGap: "5px",
    gridRowGap: "5px",
    backgroundColor: "#333333",
    gridTemplateColumns: `repeat(${props.size},${100 / props.size}%)`,
    gridTemplateRows: `repeat(${props.size},${100 / props.size}%)`,
    width: "100%",
    height: "100%"
  }),
  cell: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    fontSize: "10vw",
    "&:hover": {
      "& .preview": {
        display: "block"
      }
    },
    "& .preview": {
      display: "none",
      color: "#CCCCCC"
    }
  }
}));

function Board({ size = 3 }) {
  const blankArray = new Array(size).fill(0).map(() => new Array(size).fill(0));
  const [board, setBoard] = React.useState(blankArray);
  const [winner, setWinner] = React.useState(0);
  const [currentMove, setCurrentMove] = React.useState(1);
  const classes = useStyles({ size });

  const makeMove = (row, col) => {
    let newBoard = [...board];
    newBoard[row][col] = currentMove;
    setBoard(newBoard);
    setCurrentMove(-currentMove);
  };

  React.useEffect(() => {
    if (winner !== 0) {
      alert("Winner is Player " + (winner === 1 ? "X" : "O"));
      setBoard(blankArray);
      setCurrentMove(1);
      setWinner(0);
    }
  }, [winner]);

  React.useEffect(() => {
    var colTotals = new Array(size).fill(0);
    var x = 0;
    var firstDiagTotal = 0;
    var secondDiagTotal = 0;
    var z = size - 1;

    for (x = 0; x < size; x++) {
      var rowTotal = 0;
      for (var y = 0; y < size; y++) {
        rowTotal += board[x][y];
        colTotals[y] += board[x][y];
        if (x === y) {
          firstDiagTotal += board[x][y];
        }
      }

      secondDiagTotal += board[x][z];
      z--;

      if (Math.abs(rowTotal) === size) {
        setWinner(rowTotal / size);
      }
    }

    if (Math.abs(firstDiagTotal) === size) {
      setWinner(firstDiagTotal / size);
    } else if (Math.abs(secondDiagTotal) === size) {
      setWinner(secondDiagTotal / size);
    }

    for (x = 0; x < size; x++) {
      if (Math.abs(colTotals[x]) === size) {
        setWinner(colTotals[x] / size);
      }
    }
  }, [size, board]);

  return (
    <div className={classes.board}>
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell
            currentMove={currentMove}
            value={board[rowIndex][cellIndex]}
            className={classes.cell}
            onClick={() => makeMove(rowIndex, cellIndex)}
          />
        ))
      )}
    </div>
  );
}

export default Board;
