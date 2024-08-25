let _ = class DB {
   static localStorage = [];

   static write(data){
      // if there is data then write db
      if(data){
         console.log(`Writing to DB: ${JSON.stringify(data)}`);
         this.localStorage.push(data);
         return data;
      }
      return false;
   }

   static findOne(id){
      if(id){
         for(let record of this.localStorage){
            if(record.id === id){
               return record;
            }
         }
      }
      return false;
   }

   static findByEmail(email){
      let user = false;

      if(email){  
         for(let record of this.localStorage){
            if(record.email === email){
               user = record;
            }
         }
         console.log({user});
         
         return user;
      }
   }
   


};

module.exports = _;