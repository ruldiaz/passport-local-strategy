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
   const password = document.getElementById('password');
   const errMsgDiv = document.getElementById('error-message');

   if(!email || !password){
      errMsgDiv.innerHTML = 'Incomplete form. All fields required.';
      return;
   }
})