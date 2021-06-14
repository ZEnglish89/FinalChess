var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var path = require("path");
var express = require("express");
var passport = require("passport");

var Info = require("./models/Info");
var User = require("./models/Player");

var router = express.Router();
const Player = require('./Player');
var boardjs = require('./public/js/board');

//function ensureAuthenticated(req, res, next) {
//  if (req.isAuthenticated()) {
//    next();
//  } else {
//    req.flash("info", "You must be logged in to see this page.");
//    res.redirect("/login");
//  }
//}

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});


//added below for mongo
const myDatabase = require('./myDatabase');
//added above for mongo

let db = new myDatabase();


var ident = 0;

function initIdent(){
  if (ident == 0)
  {
    User.find({},function(err,user) {
      if (!err) {
        let objs = [];
        for (let i=0;i<user.length;i++) {
          if (ident < user[i].ident)
            ident = user[i].ident;
        }
      }
    });
//    ident = 3;   //this was temp to check if User.find above is an issue.
  }
}


router.get("/successroot", function(req, res) {
console.log("get successroot");
	res.json({redirect:"/"});
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
	res.json({redirect:"/login"});
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
      res.json({redirect:"/session"});
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});
});

router.get("/successlogin", function(req, res) {
console.log("get successlogin");
      res.json({redirect:"/session"});
});

router.get("/faillogin", function(req, res) {
console.log("get faillogin");
	res.json({redirect:"/login"});

});



router.get("/", function(req, res, next) {
console.log("get root");

	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);

 // User.find()
 // .sort({ createdAt: "descending" })
 // .exec(function(err, users) {
 //   if (err) { return next(err); }
 //   res.render("index", { users: users });
 // });
});


router.get("/signup", function(req, res) {
console.log("get signup");
  initIdent();

	let thePath = path.resolve(__dirname,"public/views/signup.html");
	res.sendFile(thePath);

});
router.get("/undefined", function(req, res) {
console.log("get play");
let thePath = path.resolve(__dirname,"public/views/chess.html");
	res.sendFile(thePath);

});

router.post("/play", function(req, res) {
console.log(req.user.ident);
if(boardjs.players.player1 == null){
  console.log("in first player");
  boardjs.players.player1 = req.user.ident;
}
else if(boardjs.players.player2 == null){
  console.log("in second player");
  boardjs.players.player2 = req.user.ident;
}
//console.log(boardjs.players.player1);
//console.log(boardjs.players.player2);
let thePath = path.resolve(__dirname,"public/views/chess.html");
	res.sendFile(thePath);

});


router.get("/getIdent", function(req, res) {
console.log("get ident");

	let theIdent = req.user.ident;
	res.json({ident:theIdent,player1:boardjs.players.player1,player2:boardjs.players.player2});

});

router.get("/login", function(req, res) {
console.log("get login");

	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);

});
var noop = function() {};

router.post('/changepsw', function(req, res){
    if (req.isAuthenticated()) {
        bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
            if (err) { res.json(null); }
            bcrypt.hash(req.body.password, salt, noop, function(err, hashedPassword) {
                if (err) {  res.json(null); }
                User.findOneAndUpdate({ident:req.user.ident},{password:hashedPassword},function(error,info) {
                    if (error) {
                        res.json(null);
                    }
                    else if (info == null) {
                        res.json(true);
                    }
                    res.json({password:hashedPassword});
                });
            });
        });
    }
    else
        res.json(null);
});
router.post("/joinGame",function(req,res,next){
  if(boardjs.players.player1 == null){
    boardjs.players.player1 = req.body.username;
    res.redirect("/play");
    return;
  }
  else if(boardjs.players.player2 == null){
    boardjs.players.player2 = req.body.username;
    res.redirect("/play");
    return;
  }
  res.send("We'll figure out spectating later");
})

router.get("/session", function(req, res) {
  console.log("get session");
  if (req.isAuthenticated()) {

    if (req.user.username == "admin")
    {
       let thePath = path.resolve(__dirname,"public/views/adminsession.html");
       res.sendFile(thePath);
    }
    else
    {
      console.log("working");
	     let thePath = path.resolve(__dirname,"public/views/session.html");
	     res.sendFile(thePath);
     }
  } else {
  	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);
  }
});






router.get("/adminInfo",function(req,res){

  if (req.isAuthenticated()) {

        if (req.user.username == "admin")
        {
            initAdmin(req,res);
        }
        else
          res.json(null);

  }
  else {
    res.json(null);
  }
});



//==================

function initAdmin(req,res) {
  console.log("initAdmin");
  console.log(req.user.ident);
  console.log(req.user.username);

            Info.find({},function(error,info) {
              if (error) {
                return res.json(null);
              } else {
                let list = [];
                for (let i=0;i<info.length;i++) {
                  list.push({ident:info[i].ident,name:info[i].name});
                }
                res.json ({ ident:req.user.ident,username: req.user.username,userList:list});
              }
            });
}


router.get("/userInfo",function(req,res){
      console.log("top userInfo");
  if (req.isAuthenticated()) {
      console.log("userInfo is auth");
      db.getPlayer(req.user.ident,res);
	}
	else {
		res.json(null);
	}
});


//==================




router.get("/logout", function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect("/successroot");
  } else {
    res.redirect("/failroot");
  }
});


router.post("/signup", function(req, res, next) {
console.log("post signup");

  var username = req.body.username;
  var password = req.body.password;
  ident++;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }

    var newUser = new User({
      username: username,
      password: password,
      ident: ident
    });
    newUser.save(next);    //this line has to be called.
  });


}, passport.authenticate("login", {
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));

router.get("/read",function(req,res,next){
  res.send(boardjs.board);
})
router.post("/update",function(req,res,next){
  boardjs.board.board.move(req.body.moveFrom,req.body.moveTo,req.body.name);
  res.end();
})

router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));

module.exports = router;
