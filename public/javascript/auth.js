$(function(){
<<<<<<< HEAD
    $("#signin").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
              }
        },
        messages: {
            email:{
                required: "Email is required.",
            },
            password: {
                required: "Password is required.",
                minlength: "Password must be at least 8 characters."
            }
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
=======
    
    const validatePassword = function(event, password, passwordAgain){
        if (password.val() !== passwordAgain.val()) {
            event.preventDefault();
            const toastHTML = 'Please enter the same password in both fields.';
            M.toast({html: toastHTML});
>>>>>>> 4438a6198ad16adf61935d05c46259f6bf9826a0
        }
    });

<<<<<<< HEAD
    $("#signup").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
              },
            repass: {
                equalTo: "#pass"
            }
        },
        messages: {
            email:{
                required: "Email is required.",
            },
            password: {
                required: "Password is required.",
                minlength: "Password must be at least 5 characters."
            }
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
=======
    $('#reset').on('submit', function(event){
        const pass = $('#pass');
        if (pass.val() === '') {
            event.preventDefault();
            const toastHTML = 'Please enter a password.'
            M.toast({html: toastHTML});
>>>>>>> 4438a6198ad16adf61935d05c46259f6bf9826a0
        }
    });

    $("#reset").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
              },
            repass: {
                equalTo: "#pass"
            }
        },
        messages: {
            email:{
                required: "Email is required.",
            },
            password: {
                required: "Password is required.",
                minlength: "Password must be at least 5 characters."
            }
            repass: {
                equalTo: "Passwords must match."
            }
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    });
});