const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../user/user.schema');

const opts = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: 'Nebuchadnezzar',
     issuer: 'Los Pollos Hermanos',
     audience: 'Azathoth'
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
     User.findOne({ id: jwt_payload.sub }, function (err, user) {
          if (err) {
               return done(err, false);
          }
          if (user) {
               return done(null, user);
          } else {
               return done(null, false);
          }
     });
}));



