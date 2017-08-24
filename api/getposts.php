<?php

require 'tools.php';

$con = conecta();

$query="SELECT Fotos.*, Usuarios.Nome, Usuarios.Foto FROM Fotos INNER JOIN Usuarios
                            ON Fotos.Usuarios_id = Usuarios.id ORDER BY Data_post DESC, Hora_post DESC";

$res = mysqli_query($con, $query);

$fotos = mysqli_fetch_all($res, MYSQLI_ASSOC);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Accept');


echo json_encode([
    'data'=>$fotos
]);