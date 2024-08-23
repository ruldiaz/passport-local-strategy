const express = require('express');
const router = express.Router();
const User = require('../models/user');

// register new user
router.post('/register', async (req, res)=>{
   try {
      const {firstName, lastName, email, password} = req.body;
      let user = new  User();
      let msg = false;

      msg = user.setFirstName(firstName);
      if(msg){
         return res.status(400).json({
            error: {
               code: 400,
               type: 'first name',
               message: msg
            }
         })
      }

      msg = user.setLastName(lastName);
      if(msg){
         return res.status(400).json({
            error: {
               code: 400,
               type: 'last name',
               message: msg
            }
         })
      }

      msg = user.setEmail(email);
      if(msg){
         return res.status(400).json({
            error: {
               code: 400,
               type: 'email',
               message: msg
            }
         })
      }

      msg = await user.setPassword(password);
      if(msg){
         return res.status(400).json({
            error: {
               code: 400,
               type: 'password',
               message: msg
            }
         })
      }
      // save the user to db
      user.save();
      res.status(200).json(user);
      
   } catch (error) {
      throw new Error(error);
   }
})

// login
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