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
    });
}

$('#generate1, #generate2').click(function(){
    generatePDF()
})


let collectData = function(){
    var invoiceName    = $('#invoiceName').val()
    var invoiceNumber  = $('#invoiceNumber').val()
    var companyName     = $('#companyName').val()
    var companyAddress  = $('#companyAddress').val()
    var companyCity  = $('#companyCity').val()
    var companyCountry  = $('#companyCountry').val()
    var invoiceDate  = $('#invoiceDate').val()
    var dueDate  = $('#dueDate').val()
    var clientName  = $('#clientName').val()
    var clientAddress  = $('#clientAddress').val()
    var clientCity  = $('#clientCity').val()
    var clientCountry  = $('#clientCountry').val()
    
}

$('#preview_btn').click(function(e){
    e.preventDefault()
    collectData()  
})