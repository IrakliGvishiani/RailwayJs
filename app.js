let from = document.querySelector('#From')
let to = document.querySelector('#to')
let date = document.querySelector('#date')
let search = document.querySelector('#search')


fetch('https://railway.stepprojects.ge/api/stations')
  .then(resp => resp.json())
  .then(resp => {
    resp.forEach(el => {
      from.innerHTML += `<option value="${el.name}">${el.name}</option>`
      to.innerHTML += `<option value="${el.name}">${el.name}</option>`
    })
  })


search.addEventListener('click', (e) => {
  e.preventDefault()
  

  if (!from.value || !to.value || !date.value) {
    Swal.fire({
  icon: 'error',
  title: 'შეცდომა...',
  text: 'გთხოვთ შეავსოთ ყვყელა ველი!',
})
    return;
  }


  const params = new URLSearchParams({
    from: from.value,
    to: to.value,
    date: date.value
  })

  window.location.href = `trains.html?${params.toString()}`
})
