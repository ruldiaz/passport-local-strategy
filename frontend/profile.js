window.onload = () => {
   if(!sessionStorage.getItem('isAuthenticated')){
      alert('access denied');
      window.location.href = 'index.html';
   }
}