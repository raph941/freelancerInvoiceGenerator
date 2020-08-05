var user = $('#data-store').attr('user');
var auth = "False"
if (user == "AnonymousUser"){
    $('#data-store').attr( "auth", "False" );
    auth = "False"
}
else{
    $('#data-store').attr( "auth", "True" );
    auth = "True"
}


//Login
$('#login_btn, .login_btn').click(function(e){
    e.preventDefault()
    $('#signupModal').modal('hide')
    $('#loginModal').modal('show')
})

$('#loginform').submit(function(e){
    e.preventDefault()
    var email     = $('#id_username').val()
    var password  = $('#id_password').val()
    var csrf  = $('#loginform').attr('csrf')

    $.ajax({
        url: window.location.host + "/ajax_login/",
        method: "POST",
        data: {
            'csrfmiddlewaretoken': csrf,
            "email":email,
            "password":password,
        },

        success: function(data){
            console.log(data)
            if (data.message == "invalid") {
                $('.alert__wrapper').html(
                    '<div class="alert alert-danger alert-custom alert-dismissible fade show" role="alert">Incorrect Email/Password, try again<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                );
                $('#data-store').attr( "auth", "False" );
                auth = "False"
            }
            else{
                $('#loginModal').modal('hide')
                $('.header__link').hide()
                $('.header__link2').show()
                $('#data-store').attr('user')
                $('#data-store').attr( "auth", "True" );
                $('.general-alerts').html(
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">Login Successful<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                );
                auth = "True"
            }
        }
    })
})

// Signup
$('#signup_btn, .signup_btn').click(function(e){
    e.preventDefault()
    $('#loginModal').modal('hide')
    $('#signupModal').modal('show')
})

$('#sigupform').submit(function(e){
    e.preventDefault()
    var first_name     = $('#id_first_name').val()
    var last_name  = $('#id_last_name').val()
    var email  = $('#id_email').val()
    var password1  = $('#id_password1').val()
    var password2  = $('#id_password2').val()
    var csrf  = $('#sigupform').attr('csrf')

    $.ajax({
        url: window.location.host + "/ajax_signup/",
        method: "POST",
        data: {
            'csrfmiddlewaretoken': csrf,
            'first_name': first_name,
            'last_name': last_name,
            "email":email,
            "password1":password1,
            'password2': password2
        },
        
        success: function(data){
            console.log(data.message)
            if (data.message == "Success") {
                $('#signupModal').modal('hide')
                $('#loginModal').modal('show')
                $('#data-store').attr( "auth", "True" );
                $('.general-alerts').html(
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">Signup Successful<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                );
            }
            else{
                $('.alert__wrapper').html(
                    '<div class="alert alert-danger alert-custom alert-dismissible fade show" role="alert">' + data.message +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                );
            }
        }
    })
})




$('.downloadBtn').click(function(e){
    if (auth == "False"){
        e.preventDefault()
        $('#loginModal').modal('show')
    }
})



// console.log('submit');
    // let theForm = document.querySelector('#invoice-form');
    // theForm.submit()