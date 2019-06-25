<?php
     $name = $_POST['name'];
     $visitor_email = $_POST['email'];
     $subject = $_POST['subject'];
     $message = $_POST['message'];

    $message = "You have received a new message from the $name\n".
                "The email id of the sender is $visitor_email\n".
                "Subject of email: $subject\n".
                "Message:\n".
                $message;

    $to = "homestar6661@gmail.com";
    $headers = "From $visitor_email";

    $sent = mail($to,$subject,$message,$headers);

    if($sent)
    {
    echo '{"success": true, "message":"Your email has been sent successfully. We will connect with you soon."}';
    }
    else
    {
    echo '{"success": false, "message":"Unable to send the email. Please try again."}';
    }
?>