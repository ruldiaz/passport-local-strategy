document.getElementById('register-form').addEventListener('submit', async (event)=>{
   event.preventDefault();
   const firstName = document.getElementById('firstName').value;
   const lastName = document.getElementById('lastName').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   debugger

   const errMsgDiv = document.getElementById('error-message');

   if(!firstName || !lastName || !email || !password){
      errMsgDiv.innerHTML = 'Incomplete form. All fields are required.';
      return;
   }

   try {
      const response = await fetch('http://localhost:3000/api/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
         })
      });      
      if(response.ok){
         const {email, name} = await response.json();
         window.location.href = `index.html?email=${encodeURIComponent(email)}`;
      }else{
         const { error } = await response.json();
         throw new Error(error?.message[0]);
      }
   } catch (error) {
      errMsgDiv.innerHTML = `Failed to register user: ${error.message ? error.message : 'Unknown error occurred.'}`;
   }
})