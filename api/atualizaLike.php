<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST'){
    exit('Permissão negada');
}

require 'tools.php';

if(validaToken($_POST['id'], $_POST['token']) === false){
    exit('Permissão negada');
}

$con = conecta();

$postId = $_POST['postId'];

$sql = "SELECT COUNT(*) AS total_like 
        FROM curtidas
        WHERE Fotos_id=$postId";

$res = mysqli_query($con, $sql);

$post = mysqli_fetch_assoc($res);

header('Content-Type: application/json');

echo json_encode($post);
