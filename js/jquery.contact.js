(function($) { 
    "use strict";
    
    jQuery(document).ready(function(){
        $('#cform').submit(function(event){
            event.preventDefault(); // Prevent default form submission

            var action = $(this).attr('action');

            console.log("Submitting to:", action);

            $("#message").slideUp(750, function() {
                $('#message').hide();

                $('#submit')
                    .before('<img src="images/ajax-loader.gif" class="contact-loader" />')
                    .attr('disabled', 'disabled');

                $.post(action, {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    comments: $('#comments').val(),
                })
                .done(function(data) {
                    console.log("Response received:", data);
                    document.getElementById('message').innerHTML = data;
                    $('#message').slideDown('slow');
                    $('#cform img.contact-loader').fadeOut('slow', function() { $(this).remove(); });
                    $('#submit').removeAttr('disabled');
                    if (data.match('success') != null) $('#cform').slideUp('slow');
                })
                .fail(function(xhr, status, error) {
                    console.error("Request failed with status:", status);
                    console.error("Error message:", error);
                    console.error("Response text:", xhr.responseText);
                    $('#message').html("An error occurred: " + xhr.status + " " + error);
                    $('#message').slideDown('slow');
                    $('#cform img.contact-loader').fadeOut('slow', function() { $(this).remove(); });
                    $('#submit').removeAttr('disabled');
                });
            });

            return false;
        });
    });
}(jQuery));
