$(function(){

    $('#signup').on('submit', function(event){
        
        // event.preventDefault();
        
        // const email = $('#email');
        const pass = $('#pass');
        const rePass = $("#re-pass");
        
        if (pass.val() !== rePass.val()) {
            event.preventDefault();
            alert('Please enter the same password in both fields.');
        }
        //     pass.val('');
        //     rePass.val('');
        //     alert('Please enter the same password in both fields.');
        // } else {
        //     $.post("/signup", { 
        //         email: email.val(), 
        //         password: pass.val() 
        //     }).then(function(){
        //         $.redirect('/game');
        //     });
        // } 

    });

});