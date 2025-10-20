

let id = localStorage.getItem('ticketId')

let cont = document.querySelector('.container')

let totalP = localStorage.getItem('totalPrice')

let card = localStorage.getItem('card')

let printDiv = document.querySelector('.printDiv')


printDiv.addEventListener('click',() => {
    window.print()
})



function coveredCard (cardNumber){
    let firstFour = cardNumber.slice(0,4)
    let lastFour = cardNumber.slice(-4)

    let covered = firstFour + `********` + lastFour

    return covered
}

fetch(`https://railway.stepprojects.ge/api/tickets/checkstatus/${id}`)
.then(res => res.json())
.then(data => {
    console.log(data)
    cont.innerHTML = `
    <div class="header">
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
        

      
        <div class="section">
            <h2>Payment info:</h2>
            <div class="payment-info">
                <div class="payment-method">Credit Card - ${coveredCard(card)}</div>
                <div class="payment-total">
                    <span class="label">სულ გადახდილი</span>
                    <span class="amount">${totalP} ₾</span>
                </div>
            </div>
        </div>
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
    `
    
}).catch((error) => alert(error))

