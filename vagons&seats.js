
 const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
let passId = params.get('passengers')


  let X=document.querySelector('.X')
    let trainCard = document.querySelector('.train-card')
    let rame = document.querySelector('.rame')
    let vaagonsDiv = document.querySelector('.vagons')

    let passDiv = document.querySelector('.passengeeeers')

    let fixedVag = document.querySelector('.vagOns')

    let row = document.querySelector('.vagRow')

    let seatsButton = document.querySelector('.seatsButton')
    let xMCross = document.querySelector('.xM')

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

             function renderVagons(array){
                for(let el of array.vagons){

                    let vag = document.createElement('div')
                    vag.classList.add('vagg')
                    vag.style.cursor = 'pointer'
                    vag.textContent = `${el.name} 🚂`
                    row.appendChild(vag)
                    

                    vag.addEventListener('click',() => {
                        fetch(`https://railway.stepprojects.ge/api/getvagon/${el.id}`)
                        .then(resp => resp.json())
                        .then(resp => {
                            console.log(resp);
                            

                            rame.innerHTML = ''

                          let closeBtn = document.createElement('button')
                           closeBtn.textContent = '✕'
                              closeBtn.style.position = 'absolute';
                                 closeBtn.style.top = '-30px';
                              closeBtn.style.right = '10px';
                           closeBtn.style.background = '#ff4444';
                              closeBtn.style.color = 'white';
                              closeBtn.style.border = 'none';
                              closeBtn.style.borderRadius = '50%';
                             closeBtn.style.width = '35px';
                              closeBtn.style.height = '35px';
                              closeBtn.style.fontSize = '20px';
                              closeBtn.style.cursor = 'pointer';
                               closeBtn.style.zIndex = '10';                        

                              closeBtn.addEventListener('click',() => {
                                rame.innerHTML = ``
                              })
                              rame.appendChild(closeBtn)

                              rame.style.position = 'relative'
                           rame.style.display = 'grid'
                          rame.style.gridTemplateColumns = 'repeat(6, 1fr)'
                           rame.style.gap = '15px'

                            for(let vagon of resp){
                                // console.log(seat);

                                for(let seat of vagon.seats){
                                                      let seatBut = document.createElement('button')
                                                      seatBut.classList.add('seatsN')
                                seatBut.textContent = `${seat.number}`
                                rame.appendChild(seatBut)

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

    //   function goVagon(id){
    //     window.location.href = `./seats.html?id=${encodeURIComponent(id)}`
    //   }



    function renderPassengers(id){
            passDiv.innerHTML = ``
          for(let i = 0;i<id;i++){
         
                    passDiv.innerHTML += `
            
                <h3>მგზავრი ${[i + 1]}</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>სახელი</label>
                        <input type="text" placeholder="">
                    </div>
                    <div class="form-group">
                        <label>გვარი</label>
                        <input type="text" placeholder="">
                    </div>
                    <div class="f">
                    <button class="seatsButton">ადგილის არჩევა</button>
                    </div>
                </div>
        `
     let allSeatsButtons = document.querySelectorAll('.seatsButton')
         allSeatsButtons.forEach((btn, index) => {
           btn.addEventListener('click', () => {
            fixedVag.style.display = 'flex'
        })
    })

    xMCross.addEventListener('click',() => {
      fixedVag.style.display = 'none'
    })
          }

    }







 

 renderPassengers(passId)

