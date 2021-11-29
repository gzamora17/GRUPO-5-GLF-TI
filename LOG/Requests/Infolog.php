<?php
header("Content-type: application/json");
include 'LOG/LogModel/LOG.php';

$formulario = json_decode(file_get_contents('php://input'), true);
$directorio = 'LOG';
$path = 'LOG/InfoLog.log';