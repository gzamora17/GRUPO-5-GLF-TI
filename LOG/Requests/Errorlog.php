<?php
header("Content-type: application/json"); // enlaza php con json
include 'LOG/LogModel/LOG.php'; // Modelo de los Logs

$error = json_decode(file_get_contents('php://input'), true); // Permite recibir datos enviados desde js hacia php

if(!is_dir('LOG')){
    mkdir('LOG');
}

$log = new Log('LOG/ErrorLog.log');
$message = array( $error['Error']);
$log->__writeline('Error', implode($message));
$log->close()
?>