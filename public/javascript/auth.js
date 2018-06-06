$(function(){
    
    const validatePassword = function(event, password, passwordAgain){
        if (password.val() !== passwordAgain.val()) {
            event.preventDefault();
            const toastHTML = 'Please enter the same password in both fields.';
            M.toast({html: toastHTML});
        }
    };

    $('#reset').on('submit', function(event){
        const pass = $('#pass');
        if (pass.val() === '') {
            event.preventDefault();
            const toastHTML = 'Please enter a password.'
            M.toast({html: toastHTML});
        }
        validatePassword(event, pass, $('#re-pass'));
    });

    $('#signup').on('submit', function(event){
        validatePassword(event, $('#pass'), $('#re-pass'));
    });

});