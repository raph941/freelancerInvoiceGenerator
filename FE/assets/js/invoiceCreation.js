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
                         <img class="close__item" src="../assets/images/closeButton.png" alt="">
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


//Create PDf from HTML...
function generatePDF() {
    var HTML_Width = $("#content").width();
    var HTML_Height = $("#content").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;


    html2canvas($("#content")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        pdf.save("invoice.pdf");
        //$("#content").hide();
    });
}

$('#generate').click(function(){
    generatePDF()
    console.log('clicked')
})

// save user input as json
$('#preview').click(function(){
    var invoiceName = document.getElementById('invoiceName').value;
    var invoiceNumber = document.getElementById('invoiceNumber').value;
    var companyName = document.getElementById('companyName').value;
    var companyAddress = document.getElementById('companyAddress').value;
    var companyCity = document.getElementById('companyCity').value;
    var companyCountry =document.getElementById('companyCountry').value;
    var invoiceDate = document.getElementById('invoiceDate').value;
    var dueDate = document.getElementById('dueDate').value;
    var clientName = document.getElementById('clientName').value;
    var clientAddress = document.getElementById('clientAddress').value;
    var clientCity = document.getElementById('clientCity').value;
    var clientCountry = document.getElementById('clientCountry').value;
    var brandIdentity = document.getElementById('brandIdentity').value;
    var rateInput = document.getElementById('rateInput').value;
    var quantityInput = document.getElementById('quantityInput').value;
    var priceInput = document.getElementById('priceInput').value;
    var notes = document.getElementById('notes').value;
    var terms = document.getElementById('terms').value;
    var userInput = {
        invoiceName,
        invoiceNumber,
        companyName,
        companyAddress,
        companyCity,
        companyCountry,
        invoiceDate,
        dueDate,
        clientName,
        clientAddress,
        clientCity,
        clientCountry,
        brandIdentity,
        rateInput,
        quantityInput,
        priceInput,
        notes,
        terms
    }

    console.log(userInput);
})