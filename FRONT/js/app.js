var api = 'http://localhost:8000';

$(document).ready(function () {
    validaLogin();
    
    window.location.hash = '#fotos';

    menuToggleInit();

    $(window).on('hashchange', function () {
        switch(window.location.hash) {
            case '#fotos':
                paginaFotos();
                break;
            case '#perfil':
                paginaPerfil();
                break;
            case '#favoritos':
                paginaFavoritos();
                break;
            case '#logout':
                logout();
                break; 
        }
    });
    upload();
    postarImagem();
});

function menuToggleInit() {
    $('#menu > li').click(function (el) {
        $('#menu > li').each(function () {
            $(this).attr('class', '');
        });

        $(this).attr('class', 'active');
    });
}

function paginaFotos() {
    
}

function paginaPerfil() {

}

function paginaFavoritos() {

}

function validaLogin() {
    var token = window.localStorage.getItem('token');
    if (token === null) {
        window.location = 'index.html';
    }
}

function logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('id');
    window.location = 'index.html';
}

function upload() {
    $('#foto').on('change', function () {
        if ($(this).val()) {
            var form = new FormData();
            form.append('foto', $(this)[0].files[0]);

            $.ajax({
                url: api + '/upload.php',
                type: 'POST',
                data: form,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $('#load').show();
                },
                success: function (data) {
                    $('#load').hide();
                    $("#preview").attr('src', api + '/' + data.img);
                    window.upload_foto = data.img;
                }
            });
        }
    });
    $('#btn_postar').click(function  () {
        var foto = window.upload_foto;

        if (foto === undefined) {
            alert('Escolha uma imagem');
            return;
        }

        var form = new FormData();

        form.append('foto', window.upload_foto);
        form.append('descricao', $('#descricao').val());
        form.append('id', window.localStorage.getItem('id'));
        form.append('token', window.localStorage.getItem('token'));

        $.ajax({
            url: api + '/postar.php',
            type: 'POST',
            data: form,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.permission === false) {
                    logout();
                    return false;
                } 
                if (data.created === true) {
                    alert('Cadastrado com sucesso');
                    clearUpload();
                    return true;
                }
            }
        });
    });
}

function clearUpload() {
    $('#preview').attr('src', '');
    $('#postar_form')[0].reset();
    window.upload_foto = undefined;
}

function postarImagem() {
    
}