$(function(){
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
        }
    });

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