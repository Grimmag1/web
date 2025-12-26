<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $jmeno = htmlspecialchars($_POST['jmeno']);
    $email = htmlspecialchars($_POST['email']);
    $telefon = htmlspecialchars($_POST['telefon']);
    $zprava = htmlspecialchars($_POST['zprava']);
    
    $to = "dalibor.kalina2002@seznam.cz";
    $subject = "Nová zpráva z webu";
    $message = "Jméno: $jmeno\nEmail: $email\nTelefon: $telefon\n\nZpráva:\n$zprava";
    $headers = "From: $email";
    
    if (mail($to, $subject, $message, $headers)) {
        echo "Zpráva byla odeslána!";
    } else {
        echo "Chyba při odesílání.";
    }
}
?>