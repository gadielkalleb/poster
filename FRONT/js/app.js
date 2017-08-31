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
    if (token == null || token=='') {
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
                    atualizarPosts();
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
            exibePosts(data);
            curtir();
        }
    });
}

function exibePosts(data){
    var page=$('#page');

    page.empty();

   
    $.each(data, (index, valor)=>{

        var profile = 
            '<section class="row">'+
                '<div class="col-md-4">'+
                    '<div><img src="'+ post.Foto_perfil +'" alt=""> '+ post.Nome +'</div>'+
                '<div>'+
            '</section>';    
            
        var post = templatePost(post);

        page.append(profile + post);
    });
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
        
        var like = $(this);
        $.ajax({
            url: api +'/curtir.php',
            type: 'POST',
            data: {
                token: window.localStorage.getItem('token'),
                id: window.localStorage.getItem('id'),
                postid: $(this).attr('data-postid')
            },
            success: (data) =>{
                console.log(data);
                if (data.retorno > 0){
                    console.log(like);
                    $(like).attr('disabled', 'disabled');
                    $(like).text('descurtir');
                }
            }
        });
    });
}

function atualizaLike(postId){
    window.total = 0;
    $.ajax({
        url: api + '/atualizaLike.php',
        type: 'POST',
        data: {
            token: window.localStorage.getItem('token'),
            id: window.localStorage.getItem('id'),
            postId: postId
        },
        success: (data) =>{
            console.log($('total_likes_' + postId));
            $('#total_likes_' + postId).html(data.total_like)
        }
    });
}