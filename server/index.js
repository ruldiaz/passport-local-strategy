const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const router = require('./lib/router');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 3000;

app.use(cookieSession({
   name: 'app-auth',
   keys: ['secret-new','secret-old'],
   maxAge: 60 * 60 * 24
}));

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done)=>{
   console.log(`4 - Serialize user: ${JSON.stringify(user)}`);
   return done(null, user.id);
});

passport.use('local', new LocalStrategy({passReqToCallback: true},
   (req, username, password, done)=>{
      console.log(`2. Local Strategy verify cb: ${JSON.stringify(username)}`);
      // this is where we call db to verify the user
      return done(null, {id: "test"})
   },
));

app.use('/api', router);

app.listen(PORT, console.log(`Server running on port ${PORT}`));