window.onload = async () => {
   if(!sessionStorage.getItem('isAuthenticated')){
      alert('access denied');
      window.location.href = 'index.html';
   }else{
      try {
         const response = await fetch('http://localhost:3000/api/user', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include'
         });

         debugger
      } catch (error) {
         alert(`Failed to load profile ${error?.message || 'Uknown error'}`);
         window.location.href = 'index.html';
      }
   }
}