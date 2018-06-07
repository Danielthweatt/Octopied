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
                email: "Please enter a valid email address."
            },
            password: {
                required: "Password is required.",
                minlength: "Password must be at least 8 characters."
            }
        },
        errorElement : 'span',
        errorPlacement: function(error, element) {
            const placement = $(element).data('error');
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
            messages: {
                email:{
                    required: "Email is required.",
                    email: "Please enter a valid email address."
                },
                password: {
                    required: "Password is required.",
                    minlength: "Password must be at least 8 characters."
                }
                repass: {
                    equalTo: "Your passwords must match."
                }
            },
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
                email: "Please enter a valid email address."
            },
            password: {
                required: "Password is required.",
                minlength: "Password must be at least 8 characters."
            }
            repass: {
                equalTo: "Your passwords must match."
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