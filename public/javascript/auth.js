$(function(){

    $('#forgot').on('submit', function(event){
        
        const email = $("#email");
        
        if (email.val() === '') {
            event.preventDefault();
            alert('Please enter an email address.');
        }
    });

    $('#reset').on('submit', function(event){
        
        const pass = $('#pass');
        const rePass = $("#re-pass");
        
        if (pass.val() !== rePass.val()) {
            event.preventDefault();
            alert('Please enter the same password in both fields.');
        }
    });

    $('#signup').on('submit', function(event){
        
        const pass = $('#pass');
        const rePass = $("#re-pass");
        
        if (pass.val() !== rePass.val()) {
            event.preventDefault();
            alert('Please enter the same password in both fields.');
        }
    });

});