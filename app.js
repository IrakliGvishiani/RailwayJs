 
let token = localStorage.getItem('token')



let logOut  = document.querySelector('.Log-out')
let logDiv = document.querySelector('.logOut')

let from = document.querySelector('#From')
let to = document.querySelector('#to')
let date = document.querySelector('#date')
let search = document.querySelector('#search')
let passengers = document.querySelector('#passengers')

let regisgterButtons = document.querySelector('.toggle-buttons')
let registerDiv = document.querySelector('.registerDiv')


const today =  new Date()

let year = today.getFullYear()
let month = String(today.getMonth() + 1)
let day = String(today.getDate())

let formatted = `${year}-${month}-${day}`

date.min = formatted

fetch('https://railway.stepprojects.ge/api/stations')
  .then(resp => resp.json())
  .then(resp => {
    resp.forEach(el => {
      from.innerHTML += `<option value="${el.name}">${el.name}</option>`
      to.innerHTML += `<option value="${el.name}">${el.name}</option>`
    })
  }).catch(console.log('error')
  )

  registerDiv.addEventListener('click',() => {
    regisgterButtons.classList.toggle("active")
  })



search.addEventListener('click', (e) => {
  e.preventDefault()


  if (!from.value || !to.value || !date.value ) {
    Swal.fire({
  icon: 'error',
  title: 'შეცდომა...',
  text: 'გთხოვთ შეავსოთ ყველა ველი!',
})
    return
  }
  else if(passengers.value > 10){
        Swal.fire({
  icon: 'error',
  title: 'შეცდომა...',
  text: '10-ზე მეტ მგზავრს ვერ აირჩევთ!',
})
return
  }

  else if( token == undefined || token == null){
                Swal.fire({
          icon: 'error',
          title: 'შეცდომა...',
          text: 'გთხოვთ გაიაროთ რეგისტრაცია!',
                })
return
  }


  const params = new URLSearchParams({
    from: from.value,
    to: to.value,
    date: date.value,
    passengers : passengers.value
  })

  window.location.href = `trains.html?${params}`
})

logOut.addEventListener('click',() => {
  let con = confirm('დარწმუნებული ხართ რომ გასვლა გინდათ?')

  if(con == true) localStorage.removeItem('token')
    window.location.reload()
})


if(token == undefined || token == null) {
  logDiv.style.display = 'none'
}