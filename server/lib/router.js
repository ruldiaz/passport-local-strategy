const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

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
      res.status(200).json(user);
      
   } catch (error) {
      throw new Error(error);
   }
})

// login
/*
router.post('/login', async (req, res)=>{
   try {
      res.status(200).json({
         timestamps: Date.now(),
         message: 'Login success'
      })
   } catch (error) {
      throw new Error(error);
   }
})
*/

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

         res.status(200).json({
            redirectTo: '/profile'
         })
            
      })
      
   })(req, res, next)
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