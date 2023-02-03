const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../user/user.schema');
const LocalStrategy = require('passport-local').Strategy;

const opts = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: 'Nebuchadnezzar',
     issuer: 'Los Pollos Hermanos',
     audience: 'Azathoth'
};

passport.use(new PassportJwt.Strategy(jwtOptions,
     (jwtPayload, done) => {
          console.log('PassportJwt Strategy being processed');
          User.findById(jwtPayload.sub)
               .then((user) => {
                    if (user) {
                         done(null, user);
                    } else {
                         done(null, false);
                    }
               })
               .catch((error) => {
                    done(error, false);
               });
     }
));


//await bcrypt.compare(password, user.password);


