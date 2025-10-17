let userName = document.querySelector('#userName');
let passWord = document.querySelector('#passWord');
let submiT = document.querySelector('#submiT');

submiT.addEventListener('click', (e) => {
  e.preventDefault();

  fetch('https://rentcar.stepprojects.ge/api/Users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: userName.value,
      password: passWord.value
    })
  })
    .then(async (resp) => {
      const data = await resp.json();
      localStorage.setItem('token', data.token);

      if (resp.ok) {

        localStorage.setItem('token', data.token);
        window.location.href = './index.html';
      } 
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'არასწორი მონაცემები',
        text: 'შეიყვანეთ სწორი მონაცემები!',
      });
    });
});

