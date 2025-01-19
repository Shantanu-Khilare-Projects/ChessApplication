import { useEffect, useState } from "react";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { Button } from "../components/Button";
import chessBg from "../assets/chessBackground3.jpg";
import ConfettiExplosion from "react-confetti-explosion";
import ReactConfetti from "react-confetti";

export const MOVE = "move";
export const INIT_GAME = "init_game";
export const GAME_OVER = "game_over";

export function Game() {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [color, setColor] = useState("");
  const [board, setBoard] = useState(chess.board());
  const [gameOver, setGameOver] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("message --> ", message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          setColor(message.color);
          console.log("Game initialized");
          break;
        case MOVE:
          { 
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break; }
        case GAME_OVER:
          if (chess.in_checkmate()) {
            setGameOver("CheckMate");
            console.log("Game Over set to CheckMate");
          } else if (chess.in_stalemate()) {
            setGameOver("StaleMate");
            console.log("Game Over set to StaleMate");
          } else if (chess.in_threefold_repetition()) {
            setGameOver("Draw by Repetition");
            console.log("Game Over set to Draw by Repetition");
          } else if (chess.insufficient_material()) {
            setGameOver("Draw due to Insufficient Material");
            console.log("Game Over set to Draw due to Insufficient Material");
          }
          break;
      }
    };
  }, [socket,chess]);

  if (!socket) {
    return (
      <div className="bg-cover h-screen w-screen bg-black text-white flex justify-center items-center text-2xl">
        Connecting ...
      </div>
    );
  }

  return (
    <div
      className="bg-cover w-[100vw] h-[100vh] fixed"
      style={{
        backgroundImage: `url(${chessBg})`,
      }}
    >
      <div className="flex justify-evenly  flex-wrap py-12">
        <ChessBoard chess={chess} board={board} socket={socket} color={color} />

        <div className="px-5 py-6 bg-transparent shadow-2xl fill-black rounded-2xl">
          {!started && (
            <Button
              className="py-6"
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
          )}
          <div className="flex flex-wrap relative w-[350px] h-full justify-center items-center text-white text-2xl">
            {started && (
              <h1 className="py-6 text-2xl text-slate-200">
                You are playing as {color}
              </h1>
            )}
            {chess.in_check() && !chess.in_checkmate() && (
              <div>
                <h1 className="py-6 px-5 bg-red-500 animate-bounce hover:text-red-100 transition-all duration-300  text-3xl font-bold w-full flex justify-center text-black rounded-xl underline hover:animate-none">Check !!!</h1>
              </div>
            )}
            {gameOver && (
              <div className="flex items-center justify-center py-6 bg-transparent">
                <ConfettiExplosion />
                <ReactConfetti />
                <h1 className="text-2xl text-white border border-red-600 bg-red-500 rounded-lg px-8 py-6 shadow-lg">
                  {gameOver}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
