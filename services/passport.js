const passport = require('passport');
const User = require('../models/user');
const config = require('../config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    console.log(user);
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};
console.log(jwtOptions);
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  console.log('in jwt auth');
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }
    if (user) {
      console.log('uer found');
      console.log(user);
      done(null, user);
    } else {
      console.log('user not found');
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
