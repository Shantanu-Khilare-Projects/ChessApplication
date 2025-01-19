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
  // const [from, setFrom] = useState<null | Square>(null);
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
                    // if (!from) {
                    //   if (square && square.color === 'b')
                    //     setFrom(squareRepresentation);
                    // }
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
                              // from,
                              from: draggedFrom,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      // setFrom(null);
                      setDraggedFrom(null);
                      chess.move({
                        // from,
                        from: draggedFrom,
                        to: squareRepresentation,
                      });
                    }
                  }}
                  key={colIndex}
                  
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, squareRepresentation)}

                  className={`w-[75px] h-[75px] focus:bg-red-500 rounded text-2xl ${getBackgroundColor(
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
            <h1 className="text-white text-xl rotate-180 border-opacity-40 border rounded-l-2xl text-pretty opacity-40 px-3 py-5 bg-black">
              {rowIndex}
            </h1>
          </div>
        ))}
        <div className="h-10 flex justify-start  opacity-40 text-center">
          <div className="text-white text-xl rotate-180 border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            a
          </div>
          <div className="text-white text-xl rotate-180 border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            b
          </div>
          <div className="text-white text-xl rotate-180 border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            c
          </div>
          <div className="text-white text-xl rotate-180 border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            d
          </div>
          <div className="text-white text-xl rotate-180 border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            e
          </div>
          <div className="text-white text-xl rotate-180 border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            f
          </div>
          <div className="text-white text-xl rotate-180 border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            g
          </div>
          <div className="text-white text-xl rotate-180 border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            h
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-white-200">
        <div className="h-10 flex justify-end  opacity-40 text-center">
          <div className="text-white text-xl border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            a
          </div>
          <div className="text-white text-xl border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            b
          </div>
          <div className="text-white text-xl border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            c
          </div>
          <div className="text-white text-xl border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            d
          </div>
          <div className="text-white text-xl border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            e
          </div>
          <div className="text-white text-xl border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            f
          </div>
          <div className="text-white text-xl border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            g
          </div>
          <div className="text-white text-xl border-opacity-40 border rounded-t-2xl text-pretty w-[75px] bg-black">
            h
          </div>
        </div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            <h1 className="text-white text-xl border-opacity-40 border rounded-l-2xl text-pretty opacity-40 px-3 py-5 bg-black">
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
                    // if (!from) {
                    //   if (square && square.color === 'w')
                    //     setFrom(squareRepresentation);
                    // }
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
                              // from,
                              from: draggedFrom,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      // setFrom(null);
                      setDraggedFrom(null);
                      chess.move({
                        // from,
                        from: draggedFrom,
                        to: squareRepresentation,
                      });
                    }
                  }}
                  key={colIndex}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, squareRepresentation)}
                  className={`w-[75px] h-[75px] focus:bg-red-500 rounded text-2xl ${getBackgroundColor(
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
                  {/* {squareRepresentation} */}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }




};
