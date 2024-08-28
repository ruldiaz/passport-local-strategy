const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const router = require('./lib/router');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieSession = require('cookie-session');
const DB = require('./lib/db');
const bcrypt = require('bcrypt');

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
   console.log(`4 - Serialize user: ${JSON.stringify(user.id)}`);
   return done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
   console.log(`Deserializing user: ${id}`);
   const user = await DB.findOne(id);
   if(user){
      console.log('User found during deserialization:', user);
      return done(null, {id: user, email: user.email});
   }else{
      console.error('User not found during deserialization');
      return done(new Error(`No user with id is found`));
   }
});

passport.use('local', new LocalStrategy({passReqToCallback: true},
   async (req, username, password, done)=>{
      console.log(`2. Local Strategy verify cb: ${JSON.stringify(username)}`);
      // this is where we call db to verify the user
      let user = await DB.findByEmail(username);
      if(!user){
         console.log('User not found');
         
         return done(null, false);
      }
      console.log(`User from db: ${JSON.stringify(user)}`);
      // compare incoming password to store password
      // using bcrypt

      const result = await new Promise((resolve, reject)=>{
         bcrypt.compare(password, user.security.passwordHash, (err, res)=>{
            if(err) reject(err);
            resolve(res);
         });
      });
      if(result){
         return done(null, user);
      }else{
         return done('Password or username is incorrect. Please try again.', null);
      }
      
   },
));

app.use('/api', router);

app.listen(PORT, console.log(`Server running on port ${PORT}`));