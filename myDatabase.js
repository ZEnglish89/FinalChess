

var express = require("express");
var mongoose = require("mongoose");
var Info = require("./models/Info");
const Player = require('./Player');

let myDatabase = function() {
}



myDatabase.prototype.postPlayer = function(player,res) {
    let obj = {ident:player.ident,name:player.name};
    Info.create(player,function(error,info) {
        if (error) {
            return res.json({retVal:false});
        }
        return res.json({retVal:true});
    });
}

myDatabase.prototype.getPlayer = function(ident,res) {
  Info.find({ident:ident},function(error,info) {
      if (error) {
          return res.json({retVal:null});
      }
      else if (info == null) {
          return res.json({retVal:null});
      }

      if (info.length == 1)
      {
        return res.json({ retVal: new Player(ident,info[0].name,info[0].wins,info[0].losses) });
      }
      else
          return res.json({retVal:null});

   });

}
/*
myDatabase.prototype.addWin = function(player,res){
  Info.findOneAndUpdate({ident:player.ident})
}
*/
myDatabase.prototype.putPlayer = function(player,res) {
//  let obj = {ident:student.ident,name:student.name,grade:student.grade,volleyball:student.volleyball
//,basketball:student.basketball,soccer:student.soccer};

  Info.findOneAndUpdate({ident:player.ident},{wins:player.wins},{losses:player.losses},function(error,oldPlayer) {
    if (error) {
      console.log(error);
      return res.json({retVal:false});
    }
    else if (oldPlayer == null) {
      return res.json({retVal:false});
    }
    return res.json({retVal:true});
  });

}
myDatabase.prototype.getAndPutPlayerWin = function(player,res) {
//  let obj = {ident:student.ident,name:student.name,grade:student.grade,volleyball:student.volleyball
//,basketball:student.basketball,soccer:student.soccer};
console.log("Player ident is " + player )
Info.find({ident:player},function(error,info) {
  console.log("info is " + info)
    if (error) {
      console.log("error");
        return res.json({retVal:null});
    }
    else if (info == null) {
      console.log("info null");
        return res.json({retVal:null});
    }

    if (info.length == 1)
    {
      console.log("info[0] is " + info[0]);
      obj=info[0];
      obj.wins++;
        Info.findOneAndUpdate({ident:obj.ident},{wins:obj.wins},{losses:obj.losses},function(error,oldPlayer){
        console.log("info[0] after is " + info[0]);
        if (error) {
          console.log(error);
          return res.json({retVal:false});
        }
        else if (oldPlayer == null) {
          return res.json({retVal:false});
        }
        console.log("put fired");
        return res.json({retVal:true});
      });

    }
    else{
      console.log("else");
        return res.json({retVal:null});
}
 });

}
myDatabase.prototype.getAndPutPlayerLoss = function(player,res) {
//  let obj = {ident:student.ident,name:student.name,grade:student.grade,volleyball:student.volleyball
//,basketball:student.basketball,soccer:student.soccer};
console.log("Player ident is " + player )
Info.find({ident:player},function(error,info) {
  console.log("info is " + info)
    if (error) {
      console.log("error");
        return res.json({retVal:null});
    }
    else if (info == null) {
      console.log("info null");
        return res.json({retVal:null});
    }

    if (info.length == 1)
    {
      console.log("info[0] is " + info[0]);
      obj=info[0];
      obj.losses++;
        Info.findOneAndUpdate({ident:obj.ident},{wins:obj.wins},{losses:obj.losses},function(error,oldPlayer){
        console.log("info[0] after is " + info[0]);
        if (error) {
          console.log(error);
          return res.json({retVal:false});
        }
        else if (oldPlayer == null) {
          return res.json({retVal:false});
        }
        console.log("put fired");
        return res.json({retVal:true});
      });

    }
    else{
      console.log("else");
        return res.json({retVal:null});
}
 });

}


myDatabase.prototype.deletePlayer = function(ident,res) {
    Info.remove({ident:ident},function(error,removed) {
        if (error) {
            return res.json({retVal:false});
        }
        if (removed.result.n == 0)
          return res.json({retVal:false});
        return ({retVal:true});
    });
}


module.exports = myDatabase;
