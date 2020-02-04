const app = {};

$(document).ready(function() {
    app.view = {
        btn_verify: $('#btn-verify'),
        btn_apr: $('#btn-apr-img'),
        csrf: $('input[name=csrfmiddlewaretoken]').val(),
        verify_badge: $('#verified-badge')
    };

    app.view.btn_verify.on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: $('meta[name=api-endpoint-verify]').attr('content'),
            processData: false,
            contentType: false,
            headers: {"X-CSRFToken": app.view.csrf},
            beforeSend: function(req) {
                app.view.btn_verify.text('Loading');
                app.view.btn_verify.find('span').removeClass('d-none');
            },
            success: function(res) {
                console.log(res);
                app.view.btn_verify.find('span').addClass('d-none');
                if (res.verified) {
                    app.view.btn_verify.text('Un-verify');
                    app.view.verify_badge.removeClass('badge-warning');
                    app.view.verify_badge.addClass('badge-success');
                    app.view.verify_badge.text('Verified');
                } else {
                    app.view.btn_verify.text('Verify');
                    app.view.verify_badge.removeClass('badge-success');
                    app.view.verify_badge.addClass('badge-warning');
                    app.view.verify_badge.text('Unverified');
                }
            },
            error: function(res) {
                console.log(res);
                alert('Error, check console');
            }
        })
    });
    app.view.btn_apr.on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: $('meta[name=api-endpoint-apr-img]').attr('content'),
            processData: false,
            contentType: false,
            headers: {"X-CSRFToken": app.view.csrf},
            beforeSend: function(req) {
                app.view.btn_apr.text('Loading');
                app.view.btn_apr.find('span').removeClass('d-none');
            },
            success: function(res) {
                console.log(res);
                app.view.btn_apr.find('span').addClass('d-none');
                if (res.img_apr) {
                    app.view.btn_apr.text('Un-approve Image');
                } else {
                    app.view.btn_apr.text('Approve Image');
                }
            },
            error: function(res) {
                console.log(res);
            }
        })
    })
});