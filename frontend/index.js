window.onload = ()=>{
   const urlParams = new URLSearchParams(window.location.search);
   if(!urlParams) return;

   const email = urlParams.get('email');
   if(email){
      const emailInput = document.getElementById('email');
      emailInput.value = email;
   }
}