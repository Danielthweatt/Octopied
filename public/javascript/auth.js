$(function(){

    $('#signup').on('submit', function(event){
        
        const pass = $('#pass');
        const rePass = $("#re-pass");
        
        if (pass.val() !== rePass.val()) {
            event.preventDefault();
            alert('Please enter the same password in both fields.');
        }
    });

});