import { useEffect, useState } from "react";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { Button } from "../components/Button";
import chessBg from "../assets/chessBackground3.jpg";

export const MOVE = "move";
export const INIT_GAME = "init_game";
export const GAME_OVER = "game_over";

export function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [gameOver, setGameOver] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("message --> ", message);
      switch (message.type) {
        case INIT_GAME:
          // setChess(new Chess());
          setBoard(chess.board());
          console.log("Game initialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("move made");
          break;
        case GAME_OVER:
          if(chess.in_checkmate())
            setGameOver("CheckMate")
          else if(chess.in_stalemate())
            setGameOver("StaleMate")
          else if(chess.in_threefold_repetition())
            setGameOver("Draw by Repetition")
          else if(chess.insufficient_material())
            setGameOver("Draw due to Insufficient Material")
          console.log("Game Over");
          break;
      }
    };
  }, [socket]);

  if (!socket) {
    return <div>Connecting ...</div>;
  }

  return (
    <div className=" h-[100vh] w-[100vw] fixed bg-slate-800">
      {/* <h1 className="text-xl text-white">Finding Oponent...</h1> */}
      <hr /> <br />
      <br />
      <div className="flex justify-center flex-wrap">
        <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} />

        <div className="px-5 mt-5">
          <Button
            onClick={() => {
              socket.send(
                JSON.stringify({
                  type: INIT_GAME,
                })
              );
            }}
          >
            Play
          </Button>
          <div className="flex justify-center items-center text-white text-2xl">
            {gameOver &&
              <div className="flex items-center justify-center min-h-screen bg-gray-800">
              <h1 
                className="text-2xl text-white border border-red-600 bg-red-500 rounded-lg px-8 py-6 shadow-lg"
              >
                {gameOver}
              </h1>
            </div>
            
            
            }
          </div>
        </div>
      </div>
    </div>
  );
}
