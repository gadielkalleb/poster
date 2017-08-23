<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit('Permissao negada');
}


$foto = $_FILES['foto'];

$profile = '';

if ($foto['error'] == 0) {
    $id = time() . rand(1, 99999);
    $posts = "posts/$id.jpg";
    move_uploaded_file($foto['tmp_name'], $posts);
}

header('Content-Type: application/json');

$json = [
    'img' => $posts
];

sleep(3);

echo json_encode($json);