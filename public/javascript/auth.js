$(function(){

    const ensureEntry = function(event, field){
        const field = $(`#${field}`);
        if (field.val() === '') {
            event.preventDefault();
            alert('Please enter an email address.');
        }
    };
    
    const validatePassword = function(event){
        const pass = $('#pass');
        const rePass = $("#re-pass");
        if (pass.val() !== rePass.val()) {
            event.preventDefault();
            alert('Please enter the same password in both fields.');
        }
    };

    $('#forgot').on('submit', function(event){
        ensureEntry(event, 'email');
    });

    $('#reset').on('submit', function(event){
        ensureEntry(event, 'pass');
        validatePassword(event);
    });

    $('#signup').on('submit', function(event){
        ensureEntry(event, 'email');
        ensureEntry(event, 'pass');
        validatePassword(event);
    });

});