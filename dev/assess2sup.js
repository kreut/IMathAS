function adaptSubmitq(qn) {

    $("#results" + qn).html(_('Submitting...'));
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
    }).done(function (msg) {

        let response;
        try {
            response = JSON.parse(msg);
        } catch (error) {
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
        console.log(response)
        var returnobj = {
            subject: "lti.ext.imathas.result",
            message: response.message,
            type: response.type,
            learning_tree_message: response.learning_tree_message ? 1 : 0,
            learning_tree: response.learning_tree,
            traffic_light_color: response.traffic_light_color ? response.traffic_light_color : '',
            last_submitted: response.last_submitted,
            student_response: response.student_response,
            frame_id: frame_id
        };

        window.parent.postMessage(JSON.stringify(returnobj), '*')


    }).always(function (msg) {
        $("#toscoreqn").val('');
        $("#results" + qn).html(_(''));

    });
}

function updateCSS(raw) {
    let errorCSS = {
        "border-color": "rgba(191, 84, 84, 0.6)",
        "box-shadow": "rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(191, 84, 84, 0.6) 0px 0px 8px",
        "color": "inherit",
        "outline": "0px"
    }
    let correctCSS = {
        "border-color": "rgba(81, 153, 81, 0.8)",
        "box-shadow": "rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(81, 153, 81, 0.8) 0px 0px 8px",
        "color": "inherit",
        "outline": "0px"
    }
    $('button.primary').html('Submit Answers').removeClass('primary').addClass('button-primary')
    console.log('highlighting answers')
    console.log(raw)

    $('input, select, textarea').each(function (index) {
        console.log(raw)
        if (raw.hasOwnProperty(index)) {
            console.log(raw[index])
            let css = raw[index] === 1 ? correctCSS : errorCSS
            $(this).css(css)
            let nextSpan = $(this).next('span')
            if (nextSpan.length > 0 && nextSpan.attr('id') && nextSpan.attr('id').startsWith('mqinput-')) {
                $(this).next('span').css(css)
            }
        }
    })
}
