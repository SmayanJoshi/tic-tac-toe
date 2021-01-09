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
    fontSize: "15vh",
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
  const [board, setBoard] = React.useState(null);
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
    setBoard(new Array(size).fill(0).map(() => new Array(size).fill(0)));
  }, [size]);

  React.useEffect(() => {
    if (winner !== 0) {
      if (winner === 2) {
        alert("It's a Draw!");
      } else {
        alert("Winner is Player " + (winner === 1 ? "X" : "O"));
      }
      setBoard(new Array(size).fill(0).map(() => new Array(size).fill(0)));
      setCurrentMove(1);
      setWinner(0);
    }
  }, [winner]);

  React.useEffect(() => {
    if (!board) return;
    const currentSize = board.length;
    var colTotals = new Array(currentSize).fill(0);
    var x = 0;
    var firstDiagTotal = 0;
    var secondDiagTotal = 0;
    var z = currentSize - 1;
    var hasEmptyCells = false;

    for (x = 0; x < board.length; x++) {
      var rowTotal = 0;
      for (var y = 0; y < board.length; y++) {
        var value = board[x][y];
        if (value === 0) hasEmptyCells = true;
        rowTotal += value;
        colTotals[y] += value;
        if (x === y) {
          firstDiagTotal += value;
        }
      }

      secondDiagTotal += board[x][z];
      z--;

      if (Math.abs(rowTotal) === currentSize) {
        setWinner(rowTotal / currentSize);
      }
    }

    if (Math.abs(firstDiagTotal) === currentSize) {
      setWinner(firstDiagTotal / currentSize);
    } else if (Math.abs(secondDiagTotal) === currentSize) {
      setWinner(secondDiagTotal / currentSize);
    }

    for (x = 0; x < board.length; x++) {
      if (Math.abs(colTotals[x]) === currentSize) {
        setWinner(colTotals[x] / currentSize);
      }
    }

    if (!hasEmptyCells) setWinner(2);
  }, [board]);

  return (
    <div className={classes.board}>
      {board &&
        board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell
              key={`cell-${rowIndex}-${cellIndex}`}
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
