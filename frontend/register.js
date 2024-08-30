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
})