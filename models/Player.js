var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;

var mongoose = require("mongoose");

var playerSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ident: { type: Number, required: true },
//  wins: { type: Number, required: true },
//  losses: { type: Number, required: true },

});


var noop = function() {};

playerSchema.pre("save", function(done) {
  var player = this;

  if (!player.isModified("password")) {
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(player.password, salt, noop, function(err, hashedPassword) {
      if (err) { return done(err); }
      player.password = hashedPassword;
      done();
    });
  });
});

playerSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

playerSchema.methods.name = function() {
  return this.displayName || this.playername;
};

var Player = mongoose.model("Player", playerSchema);

module.exports = Player;
