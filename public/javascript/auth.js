$(function(){
    
    const validatePassword = function(event, password, passwordAgain){
        if (password.val() !== passwordAgain.val()) {
            event.preventDefault();
            alert('Please enter the same password in both fields.');
        }
    };

    $('#reset').on('submit', function(event){
        const pass = $('#pass');
        if (pass.val() === '') {
            event.preventDefault();
            alert('Please enter a password.');
        }
        validatePassword(event, pass, $('#re-pass'));
    });

    $('#signup').on('submit', function(event){
        validatePassword(event, $('#pass'), $('#re-pass'));
    });

});