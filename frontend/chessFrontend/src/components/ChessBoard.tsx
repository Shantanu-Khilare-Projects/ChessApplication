import { ChessInstance, PieceColor, PieceType, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({
  chess,
  board,
  socket,
  color,
}: {
  chess: ChessInstance;
  board: ({
    square: Square;
    type: PieceType;
    color: PieceColor;
  } | null)[][];
  socket: WebSocket;
  color: string;
}) => {
  const [draggedFrom, setDraggedFrom] = useState<null | Square>(null);
  let index = 8;

  const getBackgroundColor = (rowIndex: number, colIndex: number) => {
    return (rowIndex + colIndex) % 2 === 0
      ? "bg-slate-300 text-white"
      : "bg-slate-700 text-black";
  };

  const handleDragStart = (e: React.DragEvent, square: Square) => {
    e.dataTransfer.setData("square", square);
    setDraggedFrom(square);
  };

  const handleDrop = (e: React.DragEvent, targetSquare: Square) => {
    e.preventDefault();
    const fromSquare = draggedFrom;
    if (!fromSquare) return;

    socket.send(
      JSON.stringify({
        type: MOVE,
        payload: {
          move: {
            from: fromSquare,
            to: targetSquare,
          },
        },
      })
    );

    chess.move({ from: fromSquare, to: targetSquare });
    setDraggedFrom(null);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (color == "black") {
    return (
      <div className="text-white-200 rotate-180">
        <div className="h-10 flex justify-start text-center">
          <div className="flex justify-center items-start text-xl rotate-180 text-pretty w-[75px] text-white">a</div>
          <div className="flex justify-center items-start text-xl rotate-180 text-pretty w-[75px] text-white">b</div>
          <div className="flex justify-center items-start text-xl rotate-180 text-pretty w-[75px] text-white">c</div>
          <div className="flex justify-center items-start text-xl rotate-180 text-pretty w-[75px] text-white">d</div>
          <div className="flex justify-center items-start text-xl rotate-180 text-pretty w-[75px] text-white">e</div>
          <div className="flex justify-center items-start text-xl rotate-180 text-pretty w-[75px] text-white">f</div>
          <div className="flex justify-center items-start text-xl rotate-180 text-pretty w-[75px] text-white">g</div>
          <div className="flex justify-center items-start text-xl rotate-180 text-pretty w-[75px] text-white">h</div>
        </div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((square, colIndex) => {
              const squareRepresentation = (String.fromCharCode(
                97 + (colIndex % 8)
              ) +
                "" +
                (8 - rowIndex)) as Square;

              return (
                <div
                  onClick={() => {
                    if (!draggedFrom) {
                      if (square && square.color === "b") {
                        setDraggedFrom(squareRepresentation);
                      }
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from: draggedFrom,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      setDraggedFrom(null);
                      chess.move({
                        from: draggedFrom,
                        to: squareRepresentation,
                      });
                    }
                  }}
                  key={colIndex}
                  
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, squareRepresentation)}

                  className={`w-[75px] text-black h-[75px] focus:bg-red-500 rounded text-2xl drop-shadow-2xl  ${getBackgroundColor(
                    rowIndex,
                    colIndex
                  )}`}
                >
                  {square ? (
                    <img
                      className="hover:cursor-grab rotate-180 w-[72px] focus:bg-yellow-400 hover:scale-110 transition duration-300 py-0.7 px- flex justify-center items-center"
                      
                      draggable
                      onDragStart={(e) => handleDragStart(e, squareRepresentation)}
                      
                      src={`/${
                        square.color === "b"
                          ? square?.type
                          : `${square?.type.toUpperCase()} copy`
                      }.png`}
                    />
                  ) : null}
                </div>
              );
            })}
            <h1 className="text-xl text-white rotate-180 text-pretty px-1 py-5">
              {-(rowIndex-8)}
            </h1>
          </div>
        ))}
        
      </div>
    );
  } else {
    return (
      <div className="text-white-200">
        
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            <h1 className="text-white text-xl text-pretty px-1 py-5">
              {index--}
            </h1>
            {row.map((square, colIndex) => {
              const squareRepresentation = (String.fromCharCode(
                97 + (colIndex % 8)
              ) +
                "" +
                (8 - rowIndex)) as Square;

              return (
                <div
                  onClick={() => {
                    if (!draggedFrom) {
                      if (square && square.color === "b") {
                        setDraggedFrom(squareRepresentation);
                      }
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from: draggedFrom,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      setDraggedFrom(null);
                      chess.move({
                        from: draggedFrom,
                        to: squareRepresentation,
                      });
                    }
                  }}
                  key={colIndex}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, squareRepresentation)}
                  className={`w-[75px] text-black h-[75px] focus:bg-red-500 rounded text-2xl ${getBackgroundColor(
                    rowIndex,
                    colIndex
                  )}`}
                >
                  {square ? (
                    <img
                      className="hover:cursor-grab w-[72px]  focus:bg-yellow-400 hover:scale-110 transition duration-300 py-0.7 px- flex justify-center items-center"
                      draggable
                      onDragStart={(e) => handleDragStart(e, squareRepresentation)}
                      
                      src={`/${
                        square.color === "b"
                          ? square?.type
                          : `${square?.type.toUpperCase()} copy`
                      }.png`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
        <div className="h-10 flex justify-end text-center">
          <div className="text-xl flex justify-center items-start cursor-default w-[75px] text-white">a</div>
          <div className="text-xl flex justify-center items-start cursor-default w-[75px] text-white">b</div>
          <div className="text-xl flex justify-center items-start cursor-default w-[75px] text-white">c</div>
          <div className="text-xl flex justify-center items-start cursor-default w-[75px] text-white">d</div>
          <div className="text-xl flex justify-center items-start cursor-default w-[75px] text-white">e</div>
          <div className="text-xl flex justify-center items-start cursor-default w-[75px] text-white">f</div>
          <div className="text-xl flex justify-center items-start cursor-default w-[75px] text-white">g</div>
          <div className="text-xl flex justify-center items-start cursor-default w-[75px] text-white">h</div>
        </div>
      </div>
    );
  }




};
