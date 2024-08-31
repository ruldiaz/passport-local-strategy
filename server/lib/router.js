const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const DB = require('./db');

// register new user
router.post('/register', async (req, res)=>{
   try {
      const {firstName, lastName, email, password} = req.body;
      let user = new User();
      let msg = false;

      msg = user.setFirstName(firstName);
      if(msg){
         return res.status(400).json({
            error: {
               code: 400,
               type: 'First Name',
               message: msg
            }
         })
      }

      msg = user.setLastName(lastName);
      if(msg){
         return res.status(400).json({
            error: {
               code: 400,
               type: 'Last Name',
               message: msg
            }
         })
      }

      msg = user.setEmail(email);
      if(msg){
         return res.status(400).json({
            error: {
               code: 400,
               type: 'Email',
               message: msg
            }
         })
      }

      msg = await user.setPassword(password);
      if(msg){
         return res.status(400).json({
            error: {
               code: 400,
               type: 'Password',
               message: msg
            }
         })
      }
      // save the user to db
      console.log(user);
      
      user.save();

      let record = await user.parseUser();
      res.status(200).json(record);
      
   } catch (error) {
      throw new Error(error);
   }
})

router.post('/login', (req, res, next)=>{
   console.log(`1. Login handler: ${JSON.stringify(req.body)}`);
   
   passport.authenticate('local', (err, user)=>{
      console.log(`3. Passport Authenticate cb: ${JSON.stringify(user)}`);
      
      if(err){
         res.status(401).json({
            timestamp: Date.now(),
            msg: `Access denied. Username or password is incorrect.`,
            code: 401
         });
      }

      if(!user){
         res.status(401).json({
            timestamp: Date.now(),
            msg: `Unauthorized user.`,
            code: 401
         });
      }

      req.logIn(user, (err)=>{
         
         if(err){
            return next(err)
         }
         console.log('User logged in:', req.user);
         res.status(200).json({
            redirectTo: '/profile'
         })
            
      })
      
   })(req, res, next)
});

const requireAuth = (req, res, next)=>{
   console.log("\n Require auth middleware...");
   console.log('Session ID:', req.session);
   console.log('User in session:', req.user);
   if(req.isAuthenticated()){
      next();
   }else{
      return res.status(403).json({
         timestamp: Date.now(),
         msg: 'Access denied.',
         code: 403
      });
   }
}

// get user
router.get('/user', requireAuth, async (req, res)=>{

   try {
      
      //const user = await DB.findOne(req.user);
      let user = await DB.findByEmail(req.user.email);
      
      if(!user){
         return res.status(404).json({
            timestamp: Date.now(),
            msg: 'User not found',
            code: 404
         });
      }
      //console.log(user);
      
      res.status(200).json({
         user: {
            id: user.id,
            email: user.email,
            name: user.name
         }
      });

   } catch (error) {
      console.error(new Error(error.message));
      res.status(500).json({
         timestamp: Date.now(),
         msg: `Failed to get user, internal server error.`,
         code: 500
      });
   }
});

// logout
router.post('/logout', async (req, res)=>{
   try {
      res.status(200).json({
         timestamps: Date.now(),
         message: 'Logout success'
      });
   } catch (error) {
      throw new Error(error);
   }
})

// inexistent route
router.all('*', async ( req, res)=>{
   try {
      res.status(404).json({
         timestamps: Date.now(),
         message: 'Endpoint not found'
      })
   } catch (error) {
      throw new Error(error);
   }
});

module.exports = router;