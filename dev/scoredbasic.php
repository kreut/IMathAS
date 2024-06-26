<?php
// You'll need a JWT library
require("JWT.php");

// Specify auth key/secret.
$authkey = 'ltidemo';
$authsecret = 'demo';

// form initial JWT object;
$params1 = [
    'id'=>84,
    'auth'=>$authkey
];

if (isset($_POST['save'])) {
    // decode the JWT.  Also verifies the signature
    // extra json encode/decode is hack to get the result as assoc array
    $savedata = json_decode(json_encode(JWT::decode($_POST['save'], $authsecret)),true);

    // here you'd save the results to your db, the do whatever 
    // the appropriate action is.  For demo, we're going 
    // to generate both a showscored jwt, which can be used
    // for reshowing the question with scoremarkers.
    
    $showscored = $params1;
    $showscored['showscored'] = $savedata['state'];
        
    // generate the jwt's.  This could be put in a new
    // iframe jwt= query string, but in this demo we're 
    // going to pass it to the front end, then trigger the embed 
    // to use the new data.

    echo json_encode(JWT::encode($showscored, $authsecret));
    exit;
}

// build json for regular first display
$jwt1 = JWT::encode($params1, $authsecret);

?>
<!doctype html>
<head>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script>
    // This will parse the JWT (without verifying authenticity) on the front-end
    // This is handy for pulling data out of the JWTs
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
    var redispdata = null;
    $(window).on("message", function(e) {
        if (typeof e.originalEvent.data=='string' && 
            e.originalEvent.data.match(/lti\.frameResize/)
        ) {
            // handle resize message
            var edata = JSON.parse(e.originalEvent.data);
            if ("frame_id" in edata) {
                $("#"+edata["frame_id"]).height(edata.height);
                $("#"+edata["frame_id"]+"wrap").height(edata.wrapheight);
            }
        } else if (typeof e.originalEvent.data=='string' && 
            e.originalEvent.data.match(/lti\.ext\.imathas\.result/)
        ) {
            // handle score result message
            var data = JSON.parse(e.originalEvent.data);
            if (data.jwt) {
                // get values from jwt
                var contents = parseJwt(data.jwt);
                // Check and see if all parts have been answered. 
                // For this demo, we're only going to store to the backend
                //  once all parts have been answered.
                if (contents.allans) { 
                    // Report the results in the UI, if desired
                    $("#result").html("Score: "+contents.score);

                    // Save the results to the backend.  Once saved, you 
                    // can decide what to do next: display the question 
                    // scored, reshow the question for another try,
                    // move on to the next question, etc.
                    $.post({
                        url: 'scoredbasic.php',
                        data: {save: data.jwt},
                        dataType: 'json'
                    }).done(function(res) {
                        // get data from backend.  In this demo, this is 
                        // showscored info for redisplaying with score markers
                        
                        // show the results
                        document.getElementById("test1").contentWindow.postMessage(
                            JSON.stringify({subject:"imathas.show", jwt: res}), "*");
                    })
                    
                }
            }
        }
    });
    // this will trigger the submit in the iframe
    function triggersubmit() {
        document.getElementById("test1").contentWindow.postMessage("submit", "*");
    }
</script>
<p>
    <button onclick="triggersubmit()">Submit</button>
</p>
<div id="result"></div>
<div id="test1wrap" style="position:relative;">
<iframe id="test1" src="https://www.myopenmath.com/embedq2.php?jwt=<?php
    echo htmlspecialchars($jwt1);
?>&frame_id=test1" frameborder=0 style="position:absolute;z-index:1"></iframe>
</div>

</body>
</html>
