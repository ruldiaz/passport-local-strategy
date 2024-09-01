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

         if(response.ok){
            const { user } = await response.json();

            const userInfo = document.getElementById('user-info');

            const firstName = document.createElement('p');
            firstName.innerText = `First name: ${user.name.first}`;

            const lastName = document.createElement('p');
            lastName.innerText = `Last name: ${user.name.last}`;

            const email = document.createElement('p');
            email.innerText = `Email: ${user.email}`;

            userInfo.appendChild(firstName);
            userInfo.appendChild(lastName);
            userInfo.appendChild(email);
         }else{
            const { msg } = await response.json();
            throw new Error(msg);
         }
      } catch (error) {
         alert(`Failed to load profile ${error?.message || 'Uknown error'}`);
         window.location.href = 'index.html';
      }
   }
}