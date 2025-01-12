import { PieceColor,PieceType, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({chess,board,socket,setBoard}:{
  chess:any;
  setBoard:any
  board:({
    square:Square;
    type:PieceType;
    color:PieceColor;
  } | null)[][]
  socket:WebSocket
}) => {
  const [from,setFrom]=useState<null | Square>(null)
  // const [to,setTo]=useState<null | Square>(null)

  const getBackgroundColor = (rowIndex:number, colIndex:number) => {
    return (rowIndex + colIndex) % 2 === 0 ? 'bg-slate-700 text-white' : 'bg-slate-300 text-black';
  };
  
  return (
    <div className="text-white-200 ">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((square, colIndex) => {
            const squareRepresentation=String.fromCharCode(97+(colIndex%8))+""+(8-rowIndex) as Square;

            return (
            <div
              onClick={()=>{
                if(!from)
                  setFrom(squareRepresentation);
                else{
                  socket.send(JSON.stringify({
                    type:MOVE,
                    payload:{
                      move:{
                        from,
                        to:squareRepresentation
                      }
                    }
                  }))
                  setFrom(null)
                  chess.move({
                    from,
                    to:squareRepresentation
                  })
                }
              }}
              key={colIndex}
              className={`w-[75px] h-[75px]  text-2xl ${getBackgroundColor(rowIndex, colIndex)}`}
            >
              {square ? <img className="hover:cursor-grab w-[70px] mt-1 ms-1 flex justify-center items-center" src={`/${square.color ==='b' ?
                square?.type :`${square?.type.toUpperCase()} copy`}.png`}/> :null}
            </div>
          )})}
        </div>
      ))}
    </div>
  );
}  