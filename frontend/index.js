window.onload = ()=>{
   const urlParams = new URLSearchParams(window.location.search);
   if(!urlParams) return;

   const email = urlParams.get('email');
   if(email){
      const emailInput = document.getElementById('email');
      emailInput.value = email;
   }
}

document.getElementById('login-button').addEventListener('click', async (event)=>{
   event.preventDefault();
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const errMsgDiv = document.getElementById('error-message');

   if(!email || !password){
      errMsgDiv.innerHTML = 'Incomplete form. All fields required.';
      return;
   }

   try {
      const response = await fetch('http://localhost:3000/api/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            username: email,
            password
         }),
         credentials: 'include'
      });

      const {msg, redirectTo} = await response.json();

      if(response.ok){   
         sessionStorage.setItem('isAuthenticated', true);
         
         window.location.href = `${redirectTo}.html`;
      }else{
         errMsgDiv.innerHTML = `Failed to login. ${msg ? msg : `Unknown error.`}`;
      }
      
      

   } catch (error) {
      errMsgDiv.innerHTML = error?.message || 'Failed to login.';
   }
})