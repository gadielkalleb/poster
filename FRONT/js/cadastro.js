var api = 'http://localhost:8000';
window.formErrors = false;

$(document).ready(function () {
    logaUsuario();

    $('#login').submit(function (ev) {
        ev.preventDefault();

        $.post(api + '/login.php', $(this).serialize(), function (data) {
            if (data.token === false) {
                $('#msgErro').show();
            } else {
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('id', data.id);
                window.location = 'home.html';
            }
        });

        // window.location = 'index.html';
    });

    $('#cadastro').submit(function (ev) {
        ev.preventDefault();
        
        if (validateForm(ev) == false) {
            return false;
        }

        var form = new FormData($(this)[0]);

        // Ajax para enviar imagem no formulário
        $.ajax({
            url: api + '/cadastro.php',
            type: 'POST',
            data: form,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.cadastrado == true) {
                    alert('Cadastrado no sistema com sucesso');
                    $('#email').val($("#cad_email").val());
                    $('#senha').val($("#cad_senha").val());
                    $('button')[0].click();
                }                  
            }
        });

    });

    $('#telefone').on({
        blur: function () {
            validateTelefone(this);
        },
        keyup: function () {
            validateTelefone(this);
        }
    });

    $('#conf_senha').on({
        blur: function () {
            validateSenha(this);
        },
        keyup: function () {
            validateSenha(this);
        }
    });
});

function validateSenha(el) {
    var senha = $('#cad_senha').val();

    if (senha != $(el).val()) {
        $(el).parent().attr('class', 'form-group has-error');
        window.formErrors = true;
    } else {
        $(el).parent().attr('class', 'form-group has-success');
        $('#cad_senha').parent().attr('class', 'form-group has-success');
        window.formErrors = false;
    }  
}

function validateTelefone(el) {
    var regexp = /^[0-9]{2} 9?[0-9]{4}-[0-9]{4}$/i; // 11 95555-5555 | 11 5555-5555

    if (regexp.exec($(el).val())) {
        $(el).parent().attr('class', 'form-group has-success');
        window.formErrors = false;
    } else {
        $(el).parent().attr('class', 'form-group has-error');
        window.formErrors = true;
    }
}

function logaUsuario() {
    if (window.localStorage.getItem('token') != null) {
        window.location = 'home.html';
    }
}

function validateForm(event) {
    if (window.formErrors == true) {
        alert('Corrija seu formulario');
        return false;
    }
}