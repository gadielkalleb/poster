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
    atualizarPosts();
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
            form.append('token', window.localStorage.getItem('token'));
            form.append('id', window.localStorage.getItem('id'));

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
                    $('#fechar').click();
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

function atualizarPosts() {

    var form ={
        id:window.localStorage.getItem('id'),
        token:window.localStorage.getItem('token')
    }

    $.ajax({
        url:api+'/getposts.php',
        type:'POST',
        data:form,
        success: (data)=>{
            alert(data);
        }
    
    });
}

function exibePosts(){
    var page=$('#page');
    var openRow = '<section class="row">';
    '</section>'
    $.each(data, (index, valor)=>{
        page.append('');
    })

    
}


function templatePost(post){
    var post = 
            '</br>'+
            '<section class="row">'+
            '<div class="col-md-8 col-sm-12 col-xs-12">'+
                '<img class="img-rounded img-responsive" src="'+api+'/'+ post+'" alt="">'+
                '<div>Postado em '+ post.dataf_post +'</div>'+
                '<div>'+
                    '<strong>'+
                        '<span id="total_likes">7</span> likes'+
                    '</strong>'+
                '</div>'+
                '<div>'+
                    '<button class="btn btn-primary curtir" href="#">Curtir</button>'+
                    '<button class="btn btn-success pull-right">Favoritar</button>'+
                '</div>'+
            '</div>'+
        '</section>'+
        '<hr>';
    return post;    
}


function curtir(){
    $('.curtir').click(()=>{
        alert('clicou');
    })
}