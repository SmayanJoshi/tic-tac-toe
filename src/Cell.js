import React from "react";

function Cell({ className, currentMove, value, onClick }) {
  return (
    <div
      className={className}
      onClick={() => {
        if (!value) onClick();
      }}
    >
      {value ? (
        value === 1 ? (
          "X"
        ) : (
          "O"
        )
      ) : (
        <span className="preview">{currentMove === 1 ? "X" : "O"}</span>
      )}
    </div>
  );
}

export default Cell;
