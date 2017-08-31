<?php

if($_SERVER['REQUEST_METHOD'] != 'POST'){
    exit('Permissão negada');
}

require 'tools.php';

if(validaToken($_POST['id'], $_POST['token']) === false ){
    exit('Permissão negada');
}


$con = conecta();

$query="SELECT Fotos.*, 
        DATE_FORMAT(Fotos.Data_post, '%d/%m/%y') AS dataf_post,
        Usuarios.Nome, 
        Usuarios.Foto 
        FROM Fotos 
        INNER JOIN Usuarios
        ON Fotos.Usuarios_id = Usuarios.id 
        ORDER BY Data_post DESC, Hora_post DESC";

$res = mysqli_query($con, $query);

$fotos = mysqli_fetch_all($res, MYSQLI_ASSOC);

header('Content-Type: application/json');

echo json_encode([
    'data'=>$fotos
]);