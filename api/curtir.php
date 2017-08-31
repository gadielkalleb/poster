<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit('Permissão negada');
}

require 'tools.php';

if (validaToken($_POST['id'], $_POST['token'] === false)) {
    exit('Permissão negada');
}

$con = conecta();

$id = $_POST['id'];
$postid = $_POST['postid'];
$hora = date('H:i:s');//09:51:22
$data = date('Y-m-d');//2017-08-25

$insert = "INSERT INTO curtidas
            (Fotos_id, Usuarios_id, Data, Hora)
            VALUES($postid, $id, '$data', '$hora')";

mysqli_query($con, $insert);

header('Content-Type: application/json');

$res = mysqli_affected_rows($con);

echo json_encode([
    'retorno' => $res
]);