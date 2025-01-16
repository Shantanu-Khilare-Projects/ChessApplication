import { WebSocket } from "ws"
import {Chess, Square } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./message";


export class Game{
    public player1:WebSocket
    public player2:WebSocket
    public board:Chess;
    public moves:string[]
    public startTime:Date
    // public activeSquare:Square

    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1
        this.player2=player2
        this.board=new Chess()
        this.moves=[]
        this.startTime=new Date();
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            color:"white"
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            color:"black"
        }))
        
    }

    makeMove(socket:WebSocket, move:{
        from:Square,
        to:Square
    }){
        if(this.board.history().length %2 === 0 && socket !==this.player1){
            return;
        }
        if(this.board.history().length %2 === 1 && socket !==this.player2){
            return;
        }
        try{
            this.board.move(move)
        }catch(e){
            console.log("error --> ",e);
            return;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==="w"? "black" : "white"
                }
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==="w"? "black" : "white"
                }
            }))
        }
        
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))

        console.log(this.board.ascii())
    }
}