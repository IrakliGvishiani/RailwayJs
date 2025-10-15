const params = new URLSearchParams(window.location.search)
const from = params.get('from')
const to = params.get('to')
const date = params.get('date')
const resultDiv = document.querySelector('.results-list')

resultDiv.innerHTML = `<p style="text-align:center; color:gray;">🔄 მიმდინარეობს ძებნა...</p>`

fetch(`https://railway.stepprojects.ge/api/getdeparture?from=${from}&to=${to}&date=${date}`)
  .then(resp => resp.json())
  .then(resp => {


    if (!resp || (Array.isArray(resp) && resp.length === 0) || resp.error) {
      resultDiv.innerHTML = `
        <p style="color:red; font-size:18px; text-align:center; margin-top:40px;">
          ❌ მითითებულ მიმართულებაზე მატარებელი ვერ მოიძებნა
        </p>`;
      return;
    }

    let found = false
    resultDiv.innerHTML = ""; 


    if (Array.isArray(resp)) {
      resp.forEach(el => {
        if (el.trains && el.trains.length > 0) {
          found = true
          el.trains.forEach(train => {
            resultDiv.innerHTML += `
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
                  <button class="booking-button" onclick="book(${train.id})">დაჯავშნა</button>
                </div>
              </div>
            `
          })
        }
      })
    }

    if (!found) {
      resultDiv.innerHTML = `
        <p style="color:red; font-size:18px; text-align:center; margin-top:40px;">
          ❌ მითითებულ მიმართულებაზე მატარებელი ვერ მოიძებნა
        </p>`
    }
  })
  .catch(() => {
    resultDiv.innerHTML = `
      <p style="color:red; font-size:18px; text-align:center; margin-top:40px;">
        ⚠️ მოხდა შეცდომა სერვერთან დაკავშირებისას. სცადეთ თავიდან.
      </p>`
  })

function book(id) {
  window.location.href = `vagons&seats.html?id=${encodeURIComponent(id)}`
}