<?php
require 'tools.php';
//verifico se oq vem de $_SERVER é diferente de POST
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    // var_dump(print_r($_SERVER));
    exit('Permissão negada');
}
// pega os dados do formulario e armazena em variaveis
$email=$_POST['email'];
$senha=$_POST['senha'];

//conexão
$con = conecta();


//seleciona os dados que estão no banco
$sql = "SELECT id,Nome 
    FROM Usuarios 
    WHERE Email='$email' 
    AND Senha='$senha'";

$res = mysqli_query($con, $sql);

// echo mysqli_affected_rows($con);

//informa o tipo de dados para o javascript
//informa o tipo de dados para o javascript
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Accept');


//ja defino que meu token é false ja qdo o usuario entra na pagina 
$token=[
    'token' => false
];

// Trago o usuario que se logou
$usuario = mysqli_fetch_assoc($res);

if (mysqli_affected_rows($con)) {
    // gera um token para o usuario
    $hash = sha1(rand(1, 99999));

    $token['token'] = $hash;
    $token['id'] = $usuario['id'];

    $update = "UPDATE usuarios 
               SET Token='$hash'
               WHERE id={$usuario['id']}";
               
    // Atualiza o Token do usuario
    mysqli_query($con, $update);
}

echo json_encode($token);