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

         document.querySelector('.auth-app-form h2').style.display = 'none';
         document.querySelector('.auth-app-form p').style.display = 'none';

         const form = document.getElementById('register-form');
         form.style.text = 'center';

         form.innerHTML = `
            Welcome to the Auth App, ${name.first} </br></br>
            Your registration was succesful. </br>
            You will now be redirected to the login page...
         `;

         setTimeout(()=>{
            window.location.href = `index.html?email=${encodeURIComponent(email)}`;    
         },3000);

         
      }else{
         const { error } = await response.json();
         throw new Error(error?.message[0]);
      }
   } catch (error) {
      errMsgDiv.innerHTML = `Failed to register user: ${error.message ? error.message : 'Unknown error occurred.'}`;
   }
})