<?php

function conecta() {
    $con = mysqli_connect('localhost', 'kalleb', '1Pieceluffy.', 'poster');
    if (mysqli_connect_error($con)) {
        exit('Erro ao conectar');
    }
    return $con;
}

function validaToken ($id, $token) {
    $con = conecta();

    $sql = "SELECT * 
            FROM Usuarios
            WHERE id=$id 
                AND token='$token'";

    mysqli_query($con, $sql);

    return mysqli_affected_rows($con) ? true : false;
}