function adaptSubmitq(qn) {
    $("#results"+qn).html(_('Submitting...'));
    var data = dopresubmit(qn, true);
    data.append('state', document.getElementById('state').value);
    data.append('problemJWT', document.getElementById('problemJWT').value);
    console.log(data)
    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        dataType: 'json',
        data: data,
        processData: false,
        contentType: false
    }).done(function(msg) {

       let response;
        try {
           response = JSON.parse(msg);
        } catch(error) {
           alert(msg);
            return false;
        }
       // var data = parseJwt(msg.jwt);
        //$("#state").val(data.state);
        //showerrors(data.errors);
        //if (msg.disp) {
         //   $("#results"+qn).html(_("Score: ")+data.score);
          //  showandinit(qn, msg.disp);
        //} else {
         //   $("#results"+qn).html(_('Question Submitted'));
          //  $("#questionwrap"+qn).empty();
       // }

            var returnobj = {
                subject: "lti.ext.imathas.result",
                message: response.message,
                type: response.type,
                last_submitted: response.last_submitted,
                student_response: response.student_response,
                frame_id: frame_id
            };
            window.parent.postMessage(JSON.stringify(returnobj), '*');

    }).always(function(msg) {
        $("#toscoreqn").val('');
        $("#results"+qn).html(_(''));

    });
}
