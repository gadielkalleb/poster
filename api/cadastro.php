<?php
//verifico se oq vem de $_SERVER é diferente de POST
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    // var_dump(print_r($_SERVER));
    exit('Permissão negada');
}


$foto = $_FILES['foto'];

$profile = '';


if ($foto['error'] == 0) {
    $id = time() . rand(1, 99999);
    $profile = "profiles/$id.jpg";
    move_uploaded_file($foto['tmp_name'], $profile);
}

$con = conecta();

$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$senha = $_POST['senha'];

// Atenção validar o POST!!

function anti_ataque($sql){
    
    if(get_magic_quotes_gpc()){
        $sql=mysqli_real_escape_string($sql);
    }
    return mysqli_real_escape_string($sql);
}


$sql = "INSERT INTO usuarios 
            (Nome, Email, Telefone, Foto_perfil, Senha)
        VALUES
            ('$nome', '$email', '$telefone', '$profile', '$senha')
        ";

$res = mysqli_query($con, $sql);

$json = [
    'cadastrado' => false    
];

if (mysqli_affected_rows($con)) {
    $json['cadastrado'] = true;
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Accept');

echo json_encode($json);