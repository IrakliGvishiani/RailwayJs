

let input = document.querySelector('.checkId')

let butt = document.querySelector('.btn')

let warning = document.querySelector('.warning')

let container = document.querySelector('.container')

butt.addEventListener('click',() => {
    let id = input.value

    fetch(`https://railway.stepprojects.ge/api/tickets/checkstatus/${id}`)
.then(res => {
    if(!res.ok) throw new Error

    return res.json()
})
.then(data => {
    console.log(data);
    
    warning.style.display = 'none'

    container.innerHTML = `
         <div class="heade">
            <h1>Step Railway</h1>
            <img class="stepLo" src="https://railway.stepprojects.ge/assets/img/stepLogo.jpg" alt="">
        </div>

       
        <div class="ticket-info">
            <div>
                <span>ბილეთის ნომერი: ${id}</span>
                <span style="font-weight: normal; color: #374151;"></span>
            </div>

        </div>

    
        <div class="journey">
            <div class="journey-card">
                <div class="label">გამგზავრება:</div>
                <div class="value">${data.train.from} ${data.train.departure}</div>
            </div>
            <div class="journey-card">
                <div class="label">ჩასვლა:</div>
                <div class="value">${data.train.to} ${data.train.arrive}</div>
            </div>
            <div class="journey-card">
                <div class="label">გასვლის თარიღი:</div>
                <div class="value">${data.date}</div>
            </div>
        </div>

        
        <div class="section">
            <h2>საკონტაქტო ინფორმაცია:</h2>
            <div class="contact-grid">
                <div class="contact-item">
                    <span>იმეილი: </span>
                    <span>${data.email}</span>
                </div>
                <div class="contact-item">
                    <span>ტელ: ნომერი </span>
                    <span>${data.phone}</span>
                </div>
            </div>
        </div>

        <div class="passengers"></div>
        
    `
    let passengers = document.querySelector('.passengers')

    let tableTows = ''
    for(let person of data.persons){
        tableTows += `
         <tr>
             <td>${person.name}</td>
              <td>${person.idNumber}</td>
             <td>${person.seat.number}</td>
             <td>${person.seat.vagonId}</td>
         </tr>
        `
    }

    passengers.innerHTML =  `
    <div class="section">
            <h2>მგზავრები</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>სახელი:</th>
                            <th>პირადი ნომერი:</th>
                            <th>ადგილი:</th>
                            <th>ვაგონის N:</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${tableTows}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="deleteBut"> 
        <button class="deleteTicket">ბილეთის გაუქმება </button>
        </div>
        
    `

    let deleteT = document.querySelector('.deleteTicket')

let confir = ''

deleteT.addEventListener('click',() => {
    
    confir = confirm('დარწმუნებული ხართ რომ ბილეთის გაუქმება გინდათ?')

    if(confir == true){
       
        fetch(`https://railway.stepprojects.ge/api/tickets/cancel/${id}`,{
            method : 'DELETE',
        }).then(resp => {
            if(!resp.ok) throw new Error('ვერ მოხერხდა წაშლა')
                return resp.json()
        }).catch((res) =>Swal.fire({
        icon: 'success',
        title: 'წარმატება!',
        text: 'წარმატებით გაუქმდა!', res,
        
    }))
    container.innerHTML = ''
    input.value = ''
        
    }

})

    
}).catch(() => {
    warning.style.display  = 'flex'
    container.innerHTML = ''
})

})

