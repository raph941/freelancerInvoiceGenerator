var imgClose_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJjSURBVHgBxVY9j9pAEB3bQaTg4/IPKKChOQQSOmiAAvo00F5DHwqQqOAqFGiOLmVCB01+AEV8DXTEKaACiZ4GEA1CQGZWXkSMP9Z3J+UVnvV6d96+3fHMSuCATqeTlWU5cz6fs5IkhdCGqB/ba2xraLXj8fijVqtpdn4kOwJ00sBmFsSgIvFTtVpVhYiazead3+9v4KQv8Arg4p5xB54qlcrakqjVaoU8Hs9PbMbgbdAOh8Pner2+vCEiJT6f79c7kFzIFEXJcWUy76XtekcSQux0OjX4i0IPOng0365HlctlSCQSsFgsYL/fO3pNp9NQLBZhu93CarXi3Q/5fP5lOBwumSI9um4QCATY5GAw6EiSSqVMv3HfUrvdjmGU/DYjKZVKzNIqB4MBbDYbW5LRaATj8fhmDEZwDjnkR7OVkPN+v8+slTIREh1Z2rp7q692ZC5IaPsySqFQeMb2R6tBFAjz+RwikQgjC4fDzCaTSSESnYiF9x04wKiMolGUhED5UQZBEAkp4yCls9lMdDrIKGspMpDOJB6PX0i8Xq9Q6OtYyyhr6TTKePC9Xs82Gk2gEdGLGxI6E5HQN+APnZHqhoTDDRnmvO8K5SEM8Sy+h0RJOMxC3yQ3qlgMv7Koo8podCL6MxqVRaPRf75z3yx766o+YfPh2gGtdjKZgBO4MrLT6fRaURfVsKrwgfdgkWriJSMDek2iCW5ACzMo13a7XZO/XH5YqoRUfmkAvB2slGPVXt8QEajGU/nFZhdejy4qyV3fFwj/77plBBVGNI9Yt+6ROIbOWBKm1EVZRf/hVSsCjr+rpHYMlrvo/QAAAABJRU5ErkJggg==";

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)

} else {
    ready()
}

function ready() {
    let rateRegister = document.getElementById('rateInput')
    let quantityRegister = document.getElementById('quantityInput')
     let tableButton = document.getElementsByClassName('table__button')[0]
     let fileImageInput  = document.getElementById('file-input')


    rateRegister.addEventListener('keyup', function () {
        let quantity = document.getElementById('quantityInput').value
        let subTotal = document.getElementById('subTotal')
        let total = document.getElementById('total')
        let price = document.getElementById('priceInput')
        let taxes = document.getElementById('taxes')
        let rate = event.target.value
        let rowsSum = 0
        price.value = quantity * rate
        let priceUser = parseFloat(price.value)

        let rows = document.getElementsByClassName('table__info')

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i]
            let prielement = row.getElementsByClassName('price')[0]
            rowsSum += parseFloat(prielement.innerHTML)
        }

        subTotal.innerHTML = priceUser + rowsSum

        taxes.innerHTML = ((rowsSum + priceUser) * 0.10).toFixed(2)
        total.innerHTML = (((rowsSum + priceUser) * 0.10) + rowsSum + priceUser).toFixed(2)
    })


    quantityRegister.addEventListener('keyup', function () {
        let quantity = event.target.value
        let price = document.getElementById('priceInput')
        let rate = document.getElementById('rateInput').value
        price.value = quantity * rate
        let rowsSum = 0
        let priceUser = parseFloat(price.value)
        let rows = document.getElementsByClassName('table__info')

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i]
            let prielement = row.getElementsByClassName('price')[0]
            rowsSum += parseFloat(prielement.innerHTML)
        }

        subTotal.innerHTML = priceUser + rowsSum

        taxes.innerHTML = ((rowsSum + priceUser) * 0.10).toFixed(2)
        total.innerHTML = (((rowsSum + priceUser) * 0.10) + rowsSum + priceUser).toFixed(2)
    })





    tableButton.addEventListener('click', function () {
        let rowsContainer = document.getElementById('rowsContainer')
        let identity = document.getElementById('brandIdentity')
        let rate = document.getElementById('rateInput').value
        let quantity = document.getElementById('quantityInput').value
        let price = document.getElementById('priceInput').value
        let needsValidation = document.getElementsByClassName('needs__validation')[0]

        if (identity.value == "") {
            identity.classList.add('field__invalid')
            needsValidation.classList.add("invalid-container")

            setTimeout(() => {
                identity.classList.remove('field__invalid')
                needsValidation.classList.remove("invalid-container")

            }, 1500);

        } else {
            let row = `
                     <div class=" row table__info  mx-auto  mb-3 px-1 px-lg-5  d-flex justify-content-center">
                     <div class="table__item col-lg-6 col-12 description pt-3 pt-lg-0 invoiceCreation__info">
                        ${identity.value}
                     </div>
                     <div class="table__item col-lg-2 col-12 rate invoiceCreation__info">
                     ${rate}
                     </div>
                     <div class=" table__item col-lg-2 col-12 quantity invoiceCreation__info">
                         ${quantity}
                     </div>
                     <div class=" table__item col-lg-2 col-12 price pb-3 pb-lg-0 invoiceCreation__info"> ${price} </div>
                     <div class="close__container">
                         <img class="close__item" src="${imgClose_URI}" alt="close_button">
                     </div>
                 </div>
                    `

            rowsContainer.innerHTML += row
            document.getElementById('brandIdentity').value = ''
            document.getElementById('rateInput').value = '0'
            document.getElementById('quantityInput').value = '1'
            document.getElementById('priceInput').value = '0'

            addEventListenerButton()
            updateTotal()
        }
    })


    fileImageInput.addEventListener('change', function() {
        logoImageInput = document.getElementsByClassName('logo__image')[0]
         logoImageInput.src = (window.URL ? URL : webkitURL).createObjectURL(event.target.files[0])
    })
    

    addEventListenerButton()
    validate()


}



function validate() {
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

}


function addEventListenerButton() {
    let removeRegister = document.getElementsByClassName('close__container');
    for (let i = 0; i < removeRegister.length; i++) {
        let button = removeRegister[i]
        button.addEventListener('click', function () {
            removeRow()
        })
    }
}


function removeRow() {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal() {
    let rows = document.getElementsByClassName('table__info')
    let totalElement = document.getElementById('total')
    let subTotalElement = document.getElementById('subTotal')
    let taxElement = document.getElementById('taxes')

    let total = 0
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        let priceElement = row.getElementsByClassName('price')[0]

        let price = priceElement.innerHTML
        total = parseFloat(total) + parseFloat(price)
    }

    subTotalElement.innerHTML = total
    let tax = total * 0.10
    taxElement.innerHTML = parseFloat(tax).toFixed(2)
    totalElement.innerHTML = total + (total * 0.10)
}
