const {v4:uuidv4} = require('uuid');
const validate = require('validate.js');
const constraints = require('../lib/constraints');
const bcrypt = require('bcrypt');
const DB = require('../lib/db');
const { cloneDeep } = require('lodash');

let _ = class User{
   constructor(){
      this.created = Date.now();
      this.id = uuidv4();
      this.name = {
         first: null,
         last: null
      };
      this.email = null;
      this.security = {
         passwordHash: null
      };
      this.banned = false;
   }

   // save the user to the database
   save(){
      //console.log(`Succesfully saved user ${this.id} to the database`);
      //DB.write({data: 'Hello World'});
      const user = {
         id: this.id,
         created: this.created,
         name: this.name,
         email: this.email,
         security: this.security,
         banned: this.banned
      };
      console.log(`Saving user: ${JSON.stringify(user)}`);
      DB.write(user);  // Save the actual user data
   }

   // find user with id
   find(id){
      return '';
   }

   setFirstName(firstName){
      try {
         if(firstName){
            // do any sanitisation here
            firstName = firstName.trim().replace(/  +/g, ' ');
         }
         let msg = validate.single(firstName, constraints.name);
         if(msg){
            return msg;
         }else{
            this.name.first = firstName;
            return;
         }
      } catch (error) {
         throw new Error(error);
      }
   }

   setLastName(lastName){
      try {
         if(lastName){
            // do any sanitisation here
            lastName = lastName.trim().replace(/  +/g, ' ');
         }
         let msg = validate.single(lastName, constraints.name);
         if(msg){
            return msg;
         }else{
            this.name.last = lastName;
            return;
         }
      } catch (error) {
         throw new Error(error);
      }
   }

   setEmail(email){
      try {
         let msg = validate.single(email, constraints.email);
         if(msg){
            return msg;
         }else{
            this.email = email;
            return;
         }
      } catch (error) {
         throw new Error(error);
      }
   }

   async setPassword(password){
      try {         
         let msg = validate.single(password, constraints.password);
         if(msg){
            return msg;
         }else{
            this.security.passwordHash = await bcrypt.hash(password, 10); 
            return;
         }
      } catch (error) {
         throw new Error(error);
      }
   }

   async parseUser(){
      try {
         let record = cloneDeep(this);

         delete record.id;
         delete record.created;
         delete record.security;
         delete record.banned;
         
         return record;
      } catch (error) {
         throw new Error(error);
      }
   }
}

module.exports = _;