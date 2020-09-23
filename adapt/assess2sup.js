function adaptSubmitq(qn) {
    $("#results"+qn).html(_('Submitting...'));
    var data = dopresubmit(qn, true);
    data.append('state', document.getElementById('state').value);
    data.append('problemJWT', document.getElementById('problemJWT').value);
    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        dataType: 'json',
        data: data,
        processData: false,
        contentType: false
    }).done(function(msg) {
        var data = parseJwt(msg.jwt);
        $("#state").val(data.state);
        showerrors(data.errors);
        if (msg.disp) {
            $("#results"+qn).html(_("Score: ")+data.score);
            showandinit(qn, msg.disp);
        } else {
            $("#results"+qn).html(_('Question Submitted'));
            $("#questionwrap"+qn).empty();
        }
        sendupscores(msg.jwt);
    }).always(function(msg) {
        $("#toscoreqn").val('');
    });
}
