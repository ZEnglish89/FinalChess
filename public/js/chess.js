  var BLACKPAWN = "♟";
  var WHITEPAWN = "♙";
  var BLACKROOK = "♜";
  var WHITEROOK = "♖";
  var BLACKBISHOP = "♝"
  var WHITEBISHOP = "♗";
  var BLACKKNIGHT = "♞";
  var WHITEKNIGHT = "♘";
  var BLACKKING = "♚";
  var WHITEKING = "♔";
  var BLACKQUEEN = "♛";
  var WHITEQUEEN = "♕";
  var EMPTYSPACE = "";
  var lastDiv = null;
  var curPiece;
  var blackWin = false;
  var whiteWin = false;
  var playerTurn = 1;
  var player1Ident = null;
  var player2Ident = null;
  var currentPlayer = null;
  //white is player 1
  //black is player 2
  function checkVal(div){
    $.get("/getIdent",function(data){
      currentPlayer = data.ident;
      console.log(currentPlayer);
      player1Ident = data.player1;
      player2Ident = data.player2;
    });

    if((currentPlayer == player1Ident && playerTurn == 1) || (currentPlayer == player2Ident && playerTurn == 2)){
      if(!blackWin && !whiteWin){
        curPiece = div.innerHTML;

        if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+div.id).hasClass("green")){
          movePiece(div, lastDiv);
          removeGreen(div);
        }
        else{
          if(playerTurn == 1 && !(div.innerHTML == WHITEPAWN || div.innerHTML == WHITEBISHOP
            || div.innerHTML == WHITEKING || div.innerHTML == WHITEQUEEN || div.innerHTML == WHITEROOK
            || div.innerHTML == WHITEKNIGHT)){
            return;
          }
          if(playerTurn == 2 && !(div.innerHTML == BLACKPAWN || div.innerHTML == BLACKBISHOP
            || div.innerHTML == BLACKKING || div.innerHTML == BLACKQUEEN || div.innerHTML == BLACKROOK
            || div.innerHTML == BLACKKNIGHT)){
            return;
          }
          removeGreen(div);
          findPossible(div);
        }
        lastDiv = div;
      }
    }
  }

  function removeGreen(div){
    $('#board div').removeClass("green");
    console.log("removed green");
  }

  function movePiece(moveTo, lastDiv){

    if(lastDiv.innerHTML==BLACKPAWN && moveTo.parentNode.id==8){
      //moveTo.innerHTML = BLACKQUEEN;
    }
    else if(lastDiv.innerHTML==WHITEPAWN && moveTo.parentNode.id==1){
      //moveTo.innerHTML = WHITEQUEEN;
    }
    else{
      //moveTo.innerHTML = lastDiv.innerHTML;
    }

    if(playerTurn == 1)
      playerTurn = 2;
    else
      playerTurn = 1;

    $.post('/update',{name:(new URLSearchParams(window.location.search)).get("name"), moveFrom:lastDiv.id+lastDiv.parentNode.id, moveTo:moveTo.id+moveTo.parentNode.id}, function Success(data){
      console.log(data);
    });

    //lastDiv.innerHTML = EMPTYSPACE;
  }

  function toJsPiece(piece){
    switch(piece){
      case BLACKPAWN:
        return({color: "black", type: "pawn"})
      case WHITEPAWN:
        return({color: "white", type: "pawn"})
      case BLACKROOK:
        return({color: "black", type: "rook"})
      case WHITEROOK:
        return({color: "white", type: "rook"})
      case BLACKBISHOP:
        return({color: "black", type: "bishop"})
      case WHITEBISHOP:
        return({color: "white", type: "bishop"})
      case BLACKKING:
        return({color: "black", type: "king"})
      case WHITEKING:
        return({color: "white", type: "king"})
      case BLACKQUEEN:
        return({color: "black", type: "queen"})
      case WHITEQUEEN:
        return({color: "white", type: "queen"})
      case BLACKKNIGHT:
        return({color: "black", type: "knight"})
      case WHITEKNIGHT:
        return({color: "white", type: "knight"})
    }
  }
  function findPossible(div){
    if(curPiece == BLACKPAWN){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).addClass("box green");
      }
      if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,1)).html() != EMPTYSPACE
      && !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,1)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");
      }
      if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).html() != EMPTYSPACE
      && !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
      }
      if(div.parentNode.id == 2 && $("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+div.id).html() == EMPTYSPACE && $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+div.id).addClass("box green");
      }
    }
    if(curPiece == WHITEPAWN){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).addClass("box green");
      }
      if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).html() != EMPTYSPACE
      && blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");
      }
      if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).html() != EMPTYSPACE
      && blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
      }
      if(div.parentNode.id == 7 && $("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+div.id).html() == EMPTYSPACE && $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+div.id).addClass("box green");
      }
    }
/////////////////////////////////////////////////////////////////////////////

if(curPiece == BLACKBISHOP){
  var i = 1;
  while(true){
    if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      break;
    }
    else{
      break;
    }
    i++;
  }
  i = 1;
  while(true){
    if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
      break;
    }
    else{
      break;
    }
    i++;
  }
  i = 1;
  while(true){
    if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
      break;
    }
    else{
      break;
    }
    i++;
  }
  i = 1;
  while(true){
    if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      break;
    }
    else{
      break;
    }
    i++;
  }
}

if(curPiece == WHITEBISHOP){
    var i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
  }


/////////////////////////////////////////////////////////////////////////////

    if(curPiece == BLACKROOK){
      var i = 1;
      while(true){
        if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).html() == EMPTYSPACE){
          $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).addClass("box green");
        }
        else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).html())){
          $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).addClass("box green");
          break;
        }
        else{
          break;
        }
        i++;
      }
      i = 1;
      while(true){
        if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).html() == EMPTYSPACE){
          $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).addClass("box green");
        }
        else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).html())){
          $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).addClass("box green");
          break;
        }
        else{
          break;
        }
        i++;
      }
      i = 1;
      while(true){
        if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
          $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        }
        else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html())){
          $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
          break;
        }
        else{
          break;
        }
        i++;
      }
      i = -1;
      while(true){
        if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
          $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        }
        else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html())){
          $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
          break;
        }
        else{
          break;
        }
        i--;
      }
    }


    if(curPiece == WHITEROOK){
      var i = 1;
      while(true){
        if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).html() == EMPTYSPACE){
          $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).addClass("box green");
        }
        else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).html())){
          $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).addClass("box green");
          break;
        }
        else{
          break;
        }
        i++;
      }
      i = 1;
      while(true){
        if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).html() == EMPTYSPACE){
          $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).addClass("box green");
        }
        else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).html())){
          $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).addClass("box green");
          break;
        }
        else{
          break;
        }
        i++;
      }
      i = 1;
      while(true){
        if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
          $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        }
        else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html())){
          $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
          break;
        }
        else{
          break;
        }
        i++;
      }
      i = -1;
      while(true){
        if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
          $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        }
        else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html())){
          $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
          break;
        }
        else{
          break;
        }
        i--;
      }
    }
/////////////////////////////////////////////////////////////////////////////

  if(curPiece == BLACKKING){
    if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,+1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,+1)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,+1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,+1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,+1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,+1)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,+1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,+1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }
    else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,-1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }
  }

  if(curPiece == WHITEKING){
    if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).addClass("box green");
    }
    else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+div.id).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).addClass("box green");
    }
    else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+div.id).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");
    }
    else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }
    else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }
    else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,+1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,+1)).addClass("box green");
    }
    else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,+1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,+1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,+1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,+1)).addClass("box green");
    }
    else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,+1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,+1)).addClass("box green");
    }

    if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE){
      $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }
    else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,-1)).html())){
      $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");
    }
  }

/////////////////////////////////////////////////////////////////////////////
  if(curPiece == BLACKQUEEN){
    var i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).addClass("box green");
      }
      else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).addClass("box green");
      }
      else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = -1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i--;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
      }
      else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
      }
      else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(!blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
  }
  if(curPiece == WHITEQUEEN){
    var i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+div.id).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+div.id).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = -1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i--;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)-i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,-i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
    i = 1;
    while(true){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).html() == EMPTYSPACE){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
      }
      else if(blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).html())){
        $("#board").find("#" + (parseInt(div.parentNode.id)+i).toString()).find("#"+changeColumn(div.id,i)).addClass("box green");
        break;
      }
      else{
        break;
      }
      i++;
    }
  }
/////////////////////////////////////////////////////////////////////////////
    if(curPiece == BLACKKNIGHT){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,1)).html() == EMPTYSPACE
        || !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,1)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,1)).html() == EMPTYSPACE
        || !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,1)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE
        || !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,-1)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE
        || !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,-1)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,2)).html() == EMPTYSPACE
        || !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,2)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,2)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,2)).html() == EMPTYSPACE
        || !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,2)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,2)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-2)).html() == EMPTYSPACE
        || !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-2)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-2)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-2)).html() == EMPTYSPACE
        || !blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-2)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-2)).addClass("box green");
    }

    if(curPiece == WHITEKNIGHT){
      if($("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,1)).html() == EMPTYSPACE
        || blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,1)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,1)).html() == EMPTYSPACE
        || blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,1)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,1)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE
        || blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,-1)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)+2).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,-1)).html() == EMPTYSPACE
        || blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,-1)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)-2).toString()).find("#"+changeColumn(div.id,-1)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,2)).html() == EMPTYSPACE
        || blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,2)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,2)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,2)).html() == EMPTYSPACE
        || blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,2)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,2)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-2)).html() == EMPTYSPACE
        || blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-2)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)+1).toString()).find("#"+changeColumn(div.id,-2)).addClass("box green");

      if($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-2)).html() == EMPTYSPACE
        || blackPiece($("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-2)).html()))
        $("#board").find("#" + (parseInt(div.parentNode.id)-1).toString()).find("#"+changeColumn(div.id,-2)).addClass("box green");
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  function blackPiece(piece){
    if(piece == BLACKPAWN || piece == BLACKROOK | piece == BLACKKING || piece == BLACKBISHOP || piece == BLACKQUEEN || piece == BLACKKNIGHT)
      return(true);
    else
      return(false);
  }
  function changeColumn(current,changeBy){
    if(changeBy == 0)
      return(current);
    if(current=="A")
      current=1;
    if(current=="B")
      current=2;
    if(current=="C")
      current=3;
    if(current=="D")
      current=4;
    if(current=="E")
      current=5;
    if(current=="F")
      current=6;
    if(current=="G")
      current=7;
    if(current=="H")
      current=8;
    current+=changeBy;
    if(current>8||current<1)
      return(false);
    else if(current=="1")
      current="A";
    else if(current=="2")
      current="B";
    else if(current=="3")
      current="C";
    else if(current=="4")
      current="D";
    else if(current=="5")
      current="E";
    else if(current=="6")
      current="F";
    else if(current=="7")
      current="G";
    else if(current=="8")
      current="H";
    return(current);
  }
