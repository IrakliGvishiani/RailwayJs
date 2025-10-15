
 const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

    let trainCard = document.querySelector('.train-card')
    let rame = document.querySelector('.rame')

    fetch(`https://railway.stepprojects.ge/api/trains/${id}`)
      .then(res => res.json())
      .then(train => {

        renderVagons(train)


             function renderVagons(array){
                for(let el of array.vagons){

                    let vag = document.createElement('div')
                    vag.classList.add('vagg')
                    vag.textContent = `${el.name}`
                    trainCard.appendChild(vag)

                    vag.addEventListener('click',() => {
                        fetch(`https://railway.stepprojects.ge/api/getvagon/${el.id}`)
                        .then(resp => resp.json())
                        .then(resp => {
                            console.log(resp);
                            

                            rame.innerHTML = ''

                            for(let vagon of resp){
                                // console.log(seat);

                                for(let seat of vagon.seats){
                                                      let seatBut = document.createElement('button')
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
        document.getElementById('trainInfo').innerHTML = `
          <p style="color:red; text-align:center;">⚠️ შეცდომა სერვერთან დაკავშირებისას</p>`
      })

    //   function goVagon(id){
    //     window.location.href = `./seats.html?id=${encodeURIComponent(id)}`
    //   }


 

 

