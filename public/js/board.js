const players = {player1:null, player2:null};
class Board{
	board = [];
	playerTurn = 1;
	blackWin = false;
	whiteWin = false;
	constructor(){
		this.fakeconstruct();
	}
	resetBoard(){
		console.log("reset called");
this.board = [];
this.playerTurn = 1;
this.blackWin = false;
this.whiteWin = false;
//when you are at the end maybe, have an end game so that it will send everyone back to home screen
// then have them re join and make both players null
//when rejoin board is reset
this.fakeconstruct();
}
	fakeconstruct(){
		console.log("fake constructor called");
		this.board.push(new Piece("white", "rook"));
		this.board.push(new Piece("white", "knight"));
		this.board.push(new Piece("white", "bishop"));
		this.board.push(new Piece("white", "king"));
		this.board.push(new Piece("white", "queen"));
		this.board.push(new Piece("white", "bishop"));
		this.board.push(new Piece("white", "knight"));
		this.board.push(new Piece("white", "rook"));
		for(var i = 0;i<8;i++){
			this.board.push(new Piece("white", "pawn"));
		}
		for(var i = 0;i<32;i++){
			this.board.push(null);
		}
		for(var i = 0;i<8;i++){
			this.board.push(new Piece("black", "pawn"));
		}
		this.board.push(new Piece("black", "rook"));
		this.board.push(new Piece("black", "knight"));
		this.board.push(new Piece("black", "bishop"));
		this.board.push(new Piece("black", "king"));
		this.board.push(new Piece("black", "queen"));
		this.board.push(new Piece("black", "bishop"));
		this.board.push(new Piece("black", "knight"));
		this.board.push(new Piece("black", "rook"));
	}
	move(moveFrom, moveTo){
		if(this.blackWin || this.whiteWin){
			return;
		}
		if(this.board[this.findLocation(moveTo)] != null && this.board[this.findLocation(moveTo)].type == "king"){
			if(this.board[this.findLocation(moveTo)].color == "white"){
				this.blackWin = true;
				this.resetBoard();
			}
			else{
				this.whiteWin = true;
				this.resetBoard();
			}
		}
		if((moveTo[1] == 1 || moveTo[1] == 8) && this.board[this.findLocation(moveFrom)].type == "pawn" && this.blackWin != true && this.whiteWin != true)
			this.board[this.findLocation(moveTo)] = new Piece(this.board[this.findLocation(moveFrom)].color, "queen");
		else
			this.board[this.findLocation(moveTo)] = this.board[this.findLocation(moveFrom)];
		this.board[this.findLocation(moveFrom)] = null;
		this.playerTurn = this.playerTurn == 1? 2:1;
	}
	findLocation(square){
		return(this.letterToNum(square[0]) + parseInt(8-square[1])*8);
	}
	letterToNum(letter){
    switch(letter){
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
      case "E":
        return 4;
      case "F":
        return 5;
      case "G":
        return 6;
      case "H":
        return 7;
    }
  }
}

class Piece{
	constructor(color, type){
		this.color = color;
		this.type = type;
	}
}
const board = {board: new Board()};
module.exports = {
	Board: Board,
	Piece: Piece,
	players: players,
	board:board,
};
