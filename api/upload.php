<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit('Permissao negada');
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Accept');

$foto = $_FILES['foto'];

$profile = '';

if ($foto['error'] == 0) {
    $id = time() . rand(1, 99999);
    $posts = "posts/$id.jpg";
    move_uploaded_file($foto['tmp_name'], $posts);
}



$json = [
    'img' => $posts
];


echo json_encode($json);