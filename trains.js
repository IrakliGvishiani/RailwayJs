const params = new URLSearchParams(window.location.search)
const from = params.get('from')
const to = params.get('to')
const date = params.get('date')
const resultDiv = document.querySelector('.results-container')

// API გამოძახება ამ მონაცემებით
fetch(`https://railway.stepprojects.ge/api/getdeparture?from=${from}&to=${to}&date=${date}`)
  .then(resp => resp.json())
  .then(resp => {
    resp.forEach(el => {
      el.trains.forEach(train => {
        const card = `
<div class="result-item">
                <div class="train-details">
                    <span class="train-id">#${train.number}</span>
                    <span class="train-route">${train.name} Express</span>
                </div>
                <div>
                    <div class="time-display">${train.departure}</div>
                    <div class="station-name">${train.from}</div>
                </div>
                <div>
                    <div class="time-display">${train.arrive}</div>
                    <div class="station-name">${train.to}</div>
                </div>
                <div>
                    <button class="booking-button">დაჯავშნა</button>
                </div>
            </div>
        `
        resultDiv.innerHTML += card
      })
    })
  })

function book(id) {

  window.location.href = `details.html?id=${encodeURIComponent(id)}`
}