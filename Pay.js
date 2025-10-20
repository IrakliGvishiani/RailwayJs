
let totalPriceDiv = document.querySelector('.center')

let price = localStorage.getItem('totalPrice')


 let app = `
   <div class="payment-wrapper-xk9f">
        <div class="balance-label-j3m8">სულ გადასახდელი:</div>
        <div class="balance-display-v7r2">${price}₾</div>
        
        <div class="alert-message-p4n1">*ყველა ველი აუცილებლად უნდა შეივსოს!!!</div>
        
        <form class="paymentForm">
            <div class="input-container-w8q5">
                <label>ბარათის ნომერი<span class="required-star-h5k3">*</span></label>
                <input class="cardInfo" required type="text" placeholder="2456 1665 5155 5151" maxlength="16">
            </div>
            
            <div class="grid-layout-z2d7">
                <div class="form-group">
                    <label>მოქმედების ვადა<span class="required">*</span></label>
                    <input class="expiryInput" required type="text" placeholder="DD/MM/YY" maxlength="8">
                </div>
                
                <div class="form-group">
                    <label>CVC / CVV</label>
                    <input class="cvvInput" required type="text" placeholder="3 digits" maxlength="3">
                </div>
            </div>
            
            <div class="form-group">
                <label>ბარათის მფლობელი</label>
                <input class="nameInput" required type="text" placeholder="J. smith">
            </div>
            
            <button class="submit-action-b6t9 payButt">გადახდა</button>
        </form>
    </div>
`

totalPriceDiv.innerHTML = app

let cardInfo = document.querySelector('.cardInfo')
let expiryInput = document.querySelector('.expiryInput')
let cvvInput = document.querySelector('.cvvInput')
let nameInput = document.querySelector('.nameInput')
let paymentForm = document.querySelector('.paymentForm')





expiryInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4) + (value.length > 4 ? '/' + value.slice(4, 6) : '')
    }
    e.target.value = value;
})


cvvInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '')
})


paymentForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    

    let cardNumber = cardInfo.value.replace(/\s/g, '')
    

    if (cardNumber.length !== 16) {
        Swal.fire({
            icon: 'error',
            title: 'შეცდომა...',
            text: 'ბარათის ნომერი უნდა იყოს 16 ციფრი!',
        })
        return;
    }
    
    if (!expiryInput.value || expiryInput.value.length < 5) {
        Swal.fire({
            icon: 'error',
            title: 'შეცდომა...',
            text: 'გთხოვთ შეიყვანოთ მოქმედების ვადა!',
        })
        return;
    }
    
    if (!cvvInput.value || cvvInput.value.length !== 3) {
        Swal.fire({
            icon: 'error',
            title: 'შეცდომა...',
            text: 'CVV უნდა იყოს 3 ციფრი!',
        })
        return;
    }
    
    if (!nameInput.value.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'შეცდომა...',
            text: 'გთხოვთ შეიყვანოთ ბარათის მფლობელი!',
        })
        return;
    }
    

    Swal.fire({
        icon: 'success',
        title: 'წარმატებული!',
        text: 'გადახდა განხორციელდა წარმატებით!',
    })

    setTimeout(() => {
        window.location.href = './ticket.html'
    }, 1200);
})

cardInfo.addEventListener('input',() => {
    
localStorage.setItem('card',cardInfo.value)

console.log(cardInfo)

})
