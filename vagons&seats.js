const params = new URLSearchParams(window.location.search)
const id = params.get('id')
let passId = params.get('passengers')
let date = params.get('date')

let prAndSeat = document.querySelector('.prAndSeat')
let X = document.querySelector('.X')

let book = document.querySelector('.book-button')
let email = document.querySelector('#email')
let phone = document.querySelector('#phone')
let seatiD = ''

let booked = document.querySelector('.booked-button')

let trainCard = document.querySelector('.train-card')


let rame = document.querySelector('.rame')
let vaagonsDiv = document.querySelector('.vagons')

let passDiv = document.querySelector('.passengeeeers')

let fixedVag = document.querySelector('.vagOns')

let row = document.querySelector('.vagRow')
let seatsButton = document.querySelector('.seatsButton')
let xMCross = document.querySelector('.xM')

let sumPrice = document.querySelector('.sumPrice') 


let selectedSeats = []
let selectedSeatIds = []
let currentPassengerIndex = null
let seatPrices = [] 





fetch(`https://railway.stepprojects.ge/api/trains/${id}`)
  .then(res => res.json())
  .then(train => {
    renderVagons(train)

    trainCard.innerHTML += `
      <div>
        <div class="train-number">#${train.number}</div>
        <div class="train-name">${train.name} Express</div>
      </div>
      <div class="time-info">
        <div class="time">${train.departure}</div>
        <div class="station">${train.from}</div>
      </div>
       <div class="time-info">
         <div class="time">${train.arrive}</div>
        <div class="station">${train.to}</div>
      </div>
    `

    function renderVagons(array) {
      for (let el of array.vagons) {
         let vag = document.createElement('div')
        vag.classList.add('vagg')
          vag.style.cursor = 'pointer'
        vag.textContent = `${el.name} 🚂`
        row.appendChild(vag)

         vag.addEventListener('click', () => {
          fetch(`https://railway.stepprojects.ge/api/getvagon/${el.id}`)
            .then(resp => resp.json())
            .then(resp => {
              console.log(resp)

              rame.innerHTML = ''

                 let closeBtn = document.createElement('button')
               closeBtn.textContent = '✕'
              closeBtn.style.position = 'absolute'
                closeBtn.style.top = '-30px'
              closeBtn.style.right = '10px'
              closeBtn.style.background = '#ff4444'
               closeBtn.style.color = 'white'
              closeBtn.style.border = 'none'
              closeBtn.style.borderRadius = '50%'
                closeBtn.style.width = '35px'
              closeBtn.style.height = '35px'
              closeBtn.style.fontSize = '20px'
               closeBtn.style.cursor = 'pointer'
              closeBtn.style.zIndex = '10'

              closeBtn.addEventListener('click', () => {
                rame.innerHTML = ``
              })
              rame.appendChild(closeBtn)

              rame.style.position = 'relative'
              rame.style.display = 'grid'
              rame.style.gridTemplateColumns = 'repeat(6, 1fr)'
              rame.style.gap = '15px'

              for (let vagon of resp) {
                
                for (let seat of vagon.seats) {
                  let seatBut = document.createElement('button')
                  seatBut.classList.add('seatsN')
                  seatBut.textContent = `${seat.number}`
                  
               
                     if (seat.isOccupied) {
                         seatBut.setAttribute('disabled', true)
                         seatBut.style.background = '#999'
                         seatBut.style.cursor = 'not-allowed'
                       }

                  if (selectedSeats[currentPassengerIndex] === seat.number) {
                    seatBut.classList.add('activ')
                  }
                  
                  rame.appendChild(seatBut)

                  seatBut.addEventListener('click', () => {
   
                    document.querySelectorAll('.seatsN').forEach(btn => {
                      btn.classList.remove('activ')
                    })

                

                  
                  
                    
                     seatiD = seat.seatId
                    console.log(seatiD);
                    seatBut.classList.add('activ')
                    
                    

                    selectedSeats[currentPassengerIndex] = seat.number
                    seatPrices[currentPassengerIndex] = seat.price
                    selectedSeatIds[currentPassengerIndex] = seat.seatId 
                    
    
                    updateInvoice()
                    

                    setTimeout(() => {
                      fixedVag.style.display = 'none'
                    }, 300)
                  })
                }
              }
            })
        })
      }
    }
  })
  .catch(() => {
    document.querySelector('.trainInfo').innerHTML = `
      <p style="color:red; text-align:center;">⚠️ შეცდომა სერვერთან დაკავშირებისას</p>`
  })

function updateInvoice() {
  prAndSeat.innerHTML = ''
  let totalPrice = 0
  
  for (let i = 0; i < passId; i++) {
    if (selectedSeats[i]) {
      prAndSeat.innerHTML += `
        <div class="summary-row">
          <span>მგზავრი ${i + 1}: ${selectedSeats[i]}</span>
          <span class="price">${seatPrices[i]}₾</span>
          <button class="delete-seat" data-index="${i}" style="background: #ff4444; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer; margin-left: 10px;">✕</button>
        </div>
      `
      totalPrice += parseFloat(seatPrices[i])
    }
  }
  

  sumPrice.innerHTML = `
    <div class="summary-row">
      <span>სულ:</span>
      <span class="price">${totalPrice.toFixed(2)}₾</span>
    </div>
  `
  localStorage.setItem('totalPrice',totalPrice)
 
  document.querySelectorAll('.delete-seat').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index)
      selectedSeats[index] = null
      seatPrices[index] = null
      updateInvoice()
    })
  })
}

function renderPassengers(id) {
  passDiv.innerHTML = ``

  for (let i = 0; i < id; i++) {
    passDiv.innerHTML += `
      <h3>მგზავრი ${i + 1}</h3>
      <div class="form-grid">
        <div class="form-group">
          <label>სახელი</label>
          <input class="nameOfmgzavri" type="text" placeholder="">
        </div>
        <div class="form-group">
          <label>პირადი ნომერი</label>
          <input placeholder="უნდა იყოს 11 ციფრი" class="idOfmgzavri" type="text"  placeholder="" maxlength="11">
        </div>
        <div class="f">
          <button class="seatsButton" data-passenger="${i}">ადგილის არჩევა</button>
        </div>
      </div>
    `
  }

  let allSeatsButtons = document.querySelectorAll('.seatsButton')
  allSeatsButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentPassengerIndex = parseInt(btn.dataset.passenger)
      fixedVag.style.display = 'flex'
    })
  })

  xMCross.addEventListener('click', () => {
    fixedVag.style.display = 'none'
  })
}



book.addEventListener('click',() => {

  let nameOf = document.querySelectorAll('.nameOfmgzavri')
  let mgzavriId = document.querySelectorAll('.idOfmgzavri')

  let isEmpty = false
  for(let i = 0;i< nameOf.length;i++){
    if(!nameOf[i].value.trim() || !mgzavriId[i].value.trim() || mgzavriId[i].value.length != 11 || mgzavriId[i].value.includes(String)) {
      isEmpty = true
      break
    }
  }

  if(phone.value.length < 8 || !email.value.includes('@') || isEmpty || isNaN(phone.value)){
       Swal.fire({
          icon: 'error',
          title: 'შეცდომა...',
          text: 'გთხოვთ შეავსოთ ყველა ველი!',
            })
            return
  }


  let peopleArray = []
  for(let i = 0;i<nameOf.length;i++){
    peopleArray.push(
      {
        seatId : selectedSeatIds[i],
        name : nameOf[i].value,
        surname : "string",
        idNumber : mgzavriId[i].value,
        status : "string",
        payoutCompleted : true
      }
    )
  }



     fetch('https://railway.stepprojects.ge/api/tickets/register',{
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(
      {
  trainId: id,
  date: date,
  email: email.value,
  phoneNumber: phone.value,
  people: peopleArray
    }
    )
  }).then(res => res.text())
  .then(data => {
    
    if(data.includes('წარმატებით დაიჯავშნა')){

          //     Swal.fire({
          // icon: 'success',
          // title: '',
          // text: data,
          //   })
          
            window.location.href = './Pay.html'

    }
    else if(data.includes('შეცდომა')){
                    Swal.fire({
          icon: 'error',
          title: '',
          text: 'ეს ადგილი დაკავებულია!',
            })
    }

    console.log(data);
  

    let parts = data.split(':')
    
    let ticketId = parts[1]


    console.log(ticketId);

    localStorage.setItem('ticketId',ticketId)

   
  })
  

 
})



renderPassengers(passId)