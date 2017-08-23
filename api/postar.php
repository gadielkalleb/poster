<?php
require 'tools.php';

header('Content-Type: application/json');

if (validaToken($_POST['id'], $_POST['token']) === false) {
    echo json_encode([
        'erro' => 'Sem permissão',
        'permission' => false
    ]);
    exit;
}

$con = conecta();

$foto = $_POST['foto'];
$descricao = $_POST['descricao'];
$data_post = date('Y-m-d');
$hora_post = date('H:i:s');
$id = $_POST['id'];

$sql = "INSERT INTO fotos
        (Foto, Descricao, Data_post, Hora_post, Usuarios_id)
        VALUES
        ('$foto', '$descricao', '$data_post', '$hora_post', $id)";

mysqli_query($con, $sql);

if (mysqli_affected_rows($con)) {
    echo json_encode([
        'created' => true
    ]);
} else {
    echo json_encode([
        'created' => false
    ]);
}