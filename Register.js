

let userName = document.querySelector('#userName')
let passWord = document.querySelector('#passWord')
let submiT = document.querySelector('#submiT')

submiT.addEventListener('click',() => {
   

    fetch('https://rentcar.stepprojects.ge/api/Users/register', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            phoneNumber : userName.value,
            password : passWord.value
        }),
        


    }).then(resp => resp.json())
    .then(data => {
        console.log(data);
        
        window.location.href = './Login.html'
    }).catch(() => {
         Swal.fire({
        icon: 'error',
        title: 'არასწორი მონაცემები',
        text: 'ასეთი მომხმარებელი უკვე არსებობს!',
      });
    })
})