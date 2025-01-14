<?php
// embedq2.php: Embed one question via an iframe
// Operates without requiring login
// Can passback results to embedding page
//
// See https://github.com/drlippman/IMathAS-Extras/tree/master/embedq
// for documentation and examples
//
// (c) 2020 David Lippman


$init_skip_csrfp = true;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . "/../init_without_validate.php";
require_once __DIR__ . '/../assess2/AssessStandalone.php';

require(__DIR__ . "/../includes/JWT.php");

if (!function_exists('mb_str_split')) {
    /**
     * Convert a multibyte string to an array
     *
     * @param string $string The input string.
     * @param integer $split_length Maximum length of the chunk.
     * @param string $encoding The encoding parameter is the character encoding.
     * @return array
     */
    function mb_str_split($string, $split_length = 1, $encoding = null)
    {
        if (is_null($encoding)) {
            $encoding = mb_internal_encoding();
        }

        if ($split_length < 1) {
            return false;
        }

        $return_value = array();
        $string_length = mb_strlen($string, $encoding);
        for ($i = 0; $i < $string_length; $i += $split_length) {
            $return_value[] = mb_substr($string, $i, $split_length, $encoding);
        }
        return $return_value;
    }
}

require __DIR__ . '/../vendor/autoload.php';
require(__DIR__ . '/JWE.php');


$assessver = 2;
$courseUIver = 2;
$assessUIver = 2;
$qn = 5; //question number to use

$_SESSION = [];
$JWE = new JWE();
$inline_choicemap = !empty($CFG['GEN']['choicesalt']) ? $CFG['GEN']['choicesalt'] : 'test';
$statesecret = !empty($CFG['GEN']['embedsecret']) ? $CFG['GEN']['embedsecret'] : 'test';

$issigned = false;
$raw = [];
// Get basic settings from JWT or query string

if (isset($_POST['state'])) {
    $state = json_decode(json_encode(JWT::decode($_POST['state'], $statesecret)), true);
    $QS = $state;
    $QS['id'] = $state['qsid'][$qn];
} else if (isset($_REQUEST['problemJWT'])) {
    try {
        // decode JWT.  Stupid hack to convert it into an assoc array
        // verification using 'auth' is built-into the JWT method
        //$QS = json_decode(json_encode(JWT::decode($_REQUEST['problemJWT'])), true);
        $problemJWE = $_REQUEST['problemJWT'];
        $problemJWT = $JWE->decrypt($_REQUEST['problemJWT']);
        if (!$problemJWT) {
            echo "There was an error trying to connect to iMathAS: Could not decode JWT";
            exit;
        }
        $payload = json_decode($problemJWT, true);
        //$QS = $payload['imathas'];
        $QS['id'] = $payload['imathas']['id'];
        $QS['seed'] = $payload['imathas']['seed'];
        $QS['allowregen'] = $payload['imathas']['allowregen'];
        $QS['includeans'] = $payload['imathas']['includeans'];
        if (isset($payload['adapt']['raw'])) {
            $raw = $payload['adapt']['raw'];
        }

    } catch (Exception $e) {
        echo "There was an error trying to connect to iMathAS: " . $e->getMessage();
        exit;
    }
    if (!empty($QS['auth'])) {
        $issigned = true;
        if (isset($QS['showscored'])) {
            // want to redisplay question; set as state
            $_POST['state'] = $QS['showscored'];
        }
        if (isset($QS['redisplay'])) {
            // want to redisplay question; set as state
            $_POST['state'] = $QS['redisplay'];
        }
    }
} else {
    $QS = $_GET;
}

if (empty($QS['auth'])) {
    $QS['auth'] = '';
}

if (empty($QS['id'])) {
    echo 'Need to supply an id';
    exit;
}

// set user preferences
$prefdefaults = array(
    'mathdisp' => 6, //default is katex
    'graphdisp' => 1,
    'drawentry' => 1,
    'useed' => 1,
    'livepreview' => 1);

// override via cookie if set
$prefcookie = null;
if (!empty($_COOKIE["embedq2userprefs"])) {
    $prefcookie = json_decode($_COOKIE["embedq2userprefs"], true);
}
$_SESSION['userprefs'] = array();
foreach ($prefdefaults as $key => $def) {
    if (isset($QS[$key])) { // can overwrite via JWT
        $_SESSION['userprefs'][$key] = filter_var($QS[$key], FILTER_SANITIZE_NUMBER_INT);
    } else if ($prefcookie !== null && isset($prefcookie[$key])) {
        $_SESSION['userprefs'][$key] = filter_var($prefcookie[$key], FILTER_SANITIZE_NUMBER_INT);
    } else {
        $_SESSION['userprefs'][$key] = $def;
    }
}
$_SESSION['userprefs']['test'] = 'test';
// override via query string or post value; record into cookie
if (isset($_REQUEST['graphdisp'])) { //currently same is used for graphdisp and drawentry
    $_SESSION['userprefs']['graphdisp'] = filter_var($_REQUEST['graphdisp'], FILTER_SANITIZE_NUMBER_INT);
    $_SESSION['userprefs']['drawentry'] = filter_var($_REQUEST['graphdisp'], FILTER_SANITIZE_NUMBER_INT);
    setsecurecookie("embedq2userprefs", json_encode(array(
        'graphdisp' => $_SESSION['userprefs']['graphdisp'],
        'drawentry' => $_SESSION['userprefs']['drawentry'],
    )), time() + 60 * 60 * 24 * 365);
}
foreach (array('graphdisp', 'mathdisp', 'useed') as $key) {
    $_SESSION[$key] = $_SESSION['userprefs'][$key];
}

// get parameter values based on query string / JWT values
$qsid = intval($QS['id']);

// defaults
$eqnhelper = 4;
$useeqnhelper = 4;
$showtips = 2;

// load question data and load/set state
$stm = $DBH->prepare("SELECT * FROM imas_questionset WHERE id=:id");
$stm->execute(array(':id' => $qsid));
$line = $stm->fetch(PDO::FETCH_ASSOC);

$a2 = new AssessStandalone($DBH);
$a2->setQuestionData($line['id'], $line);

if (isset($_POST['state'])) {
    $state = json_decode(json_encode(JWT::decode($_POST['state'], $statesecret)), true);
    $seed = $state['seeds'][$qn];
    if (!$issigned) {
        $seed = ($seed % 10000) + 10000;
    }
} else {
    if (isset($QS['seed'])) {
        $seed = intval($QS['seed']) % 10000;
    } else {
        $seed = rand(0, 9999);
    }
    if (!$issigned) {
        $seed += 10000;
    }
    $state = array(
        'seeds' => array($qn => $seed),
        'qsid' => array($qn => $qsid),
        'stuanswers' => array(),
        'stuanswersval' => array(),
        'scorenonzero' => array(($qn + 1) => false),
        'scoreiscorrect' => array(($qn + 1) => false),
        'partattemptn' => array($qn => array()),
        'rawscores' => array($qn => array()),
        'auth' => $QS['auth'],
        'qtype' => $line['qtype']
    );
}

$overrides = array();
if (isset($QS['jssubmit'])) {
    $state['jssubmit'] = $QS['jssubmit'];
} else {
    $state['jssubmit'] = $issigned;
}

if (isset($QS['showhints'])) {
    $state['showhints'] = $QS['showhints'];
} else {
    $state['showhints'] = 3;
}

if (isset($QS['maxtries'])) {
    $state['maxtries'] = intval($QS['maxtries']);
} else {
    $state['maxtries'] = 0;
}
if (isset($QS['showansafter'])) {
    $state['showansafter'] = $QS['showansafter'];
} else if ($state['maxtries'] > 0) {
    $state['showansafter'] = $state['maxtries'];
} else {
    $state['showansafter'] = $issigned ? 0 : 1;
}
if (isset($QS['showscoredonsubmit'])) {
    $state['showscoredonsubmit'] = $QS['showscoredonsubmit'];
} else {
    $state['showscoredonsubmit'] = !$issigned;
}
$state['hidescoremarkers'] = !$state['showscoredonsubmit'];
if (isset($QS['hidescoremarkers'])) {
    $state['hidescoremarkers'] = $QS['hidescoremarkers'];
}
if (isset($QS['showscored'])) {
    $overrides['hidescoremarkers'] = false;
    if (isset($QS['showans'])) {
        $overrides['showans'] = $QS['showans'];
    } else {
        $overrides['showans'] = 0;
    }
} else {
    if (isset($QS['showans'])) {
        $state['showans'] = $QS['showans'];
    } else {
        $state['showans'] = 0;
    }
}

if (isset($QS['includeans']) && $QS['includeans']) {
    $state['includeans'] = 1;
}
if (isset($QS['allowregen'])) {
    $state['allowregen'] = $QS['allowregen'];
} else {
    $state['allowregen'] = !$issigned;
}
if (isset($QS['submitall'])) {
    $state['submitall'] = $QS['submitall'];
} else {
    $state['submitall'] = $issigned;
}
if (isset($QS['autoseq'])) {
    $state['autoseq'] = $QS['autoseq'];
} else {
    $state['autoseq'] = 1;
}


if (isset($_POST['regen']) && !$issigned) {
    $seed = rand(0, 9999) + 10000;
    $state['seeds'][$qn] = $seed;
    unset($state['stuanswers'][$qn + 1]);
    unset($state['stuanswersval'][$qn + 1]);
    $state['scorenonzero'][$qn + 1] = false;
    $state['scoreiscorrect'][$qn + 1] = false;
    $state['partattemptn'][$qn] = array();
    $state['rawscores'][$qn] = array();
}

if (isset($payload['adapt']['stuanswers']) && $payload['adapt']['stuanswers'][0]) {
    //var_dump($payload['adapt']['stuanswers'][0] );
    //print_r($payload['adapt']);
    $state['stuanswers'][$qn + 1] = $payload['adapt']['stuanswers'][0] ? $payload['adapt']['stuanswers'][0] : [];
    $state['stuanswersval'][$qn + 1] = '';
    //$state['stuanswers'][$qn + 1] = $payload['adapt']['stuanswers'];
    //
}

//print_r($state);
if (isset($payload['adapt']['showans'])) {
    $state['showans'] = $payload['adapt']['showans'];
}
$state['scoreiscorrect'][$qn + 1] = true;
$state['submitall'] = 1;


$a2->setState($state);
$is_conditional_question = $state['qtype'] === 'conditional';

//var_dump($a2->getState());
if (isset($_POST['toscoreqn'])) {
    $toscoreqn = json_decode($_POST['toscoreqn'], true);
    $parts_to_score = array();
    if (isset($toscoreqn[$qn])) {
        foreach ($toscoreqn[$qn] as $pn) {
            $parts_to_score[$pn] = true;
        };
    }
    $res = $a2->scoreQuestion($qn, $parts_to_score);

    if ($res['errors']) {
        $error = str_replace("'", '`', $res['errors'][0] . json_encode($parts_to_score));
        if (strpos($error, 'ksort() expects parameter 1 to be array, null given') !== false) {
            $error = "You did not change your submission.";
        }
        echo json_encode(utf8_encode('{"type":"error", "message":"Error: ' . $error . '"}'));
        exit;
    }
    if (!$state['stuanswers'][$qn + 1]) {
        if (!$res['allans']) {
            echo json_encode(utf8_encode('{"type":"error", "message":"Please have an entry for all answers before submitting."}'));
            exit;
        }
    }
    $jwtcontents = array(
        'id' => $qsid,
        'score' => round(array_sum($res['scores']), 2),
        'raw' => $res['raw'],
        'allans' => $res['allans'],
        'errors' => $res['errors'],
        'state' => JWT::encode($a2->getState(), $statesecret)
    );

    //decode to get the URL
    $problemJWT = $_REQUEST['problemJWT'];
    $problemJWT = $JWE->decrypt($_REQUEST['problemJWT']);
    $old_payload = json_decode($problemJWT, true);

    $url = $old_payload['scheme_and_host'];

    $payload = [
        'id' => $qsid,
        'score' => round(array_sum($res['scores']), 2),
        'raw' => $res['raw'],
        'allans' => $res['allans'],
        'errors' => $res['errors'],
        'state' => JWT::encode($a2->getState(), $statesecret)
    ];

    foreach ($old_payload as $key => $value) {
        $payload[$key] = $value;
    }

    $payload['problemJWT'] = $_REQUEST['problemJWT'];
    $answerJWT = JWT::encode($payload, file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/../JWE/webwork'));
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $answerJWT);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //cURL will only work on live or dev --- not local for some reason...

    curl_setopt($ch, CURLOPT_URL, "$url/api/jwt/process-answer-jwt");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch); // Execute the cURL statement

    if ($result === false) {
        echo json_encode(utf8_encode('{"type":"error", "message":"There was an error trying to connect to Adapt: ' . curl_error($ch) . '"}'));
        exit;
    }
    curl_close($ch); // Close the cURL connection

    if ($QS['auth'] != '') {
        $stm = $DBH->prepare("SELECT password FROM imas_users WHERE SID=?");
        $stm->execute(array($QS['auth']));
        $authsecret = $stm->fetchColumn(0);
    } else {
        $authsecret = '';
    }
    $jwt = JWT::encode($jwtcontents, $authsecret);


    if ($state['showscoredonsubmit'] || (!$res['allans'] && $state['autoseq'])) {
        $disp = $a2->displayQuestion($qn, $overrides);
        $out['disp'] = $disp;
    }
    echo json_encode($result);
    exit;
}

$disp = $a2->displayQuestion($qn, $overrides);

// force submitall
if ($state['submitall']) {
    $disp['jsparams']['submitall'] = 1;
}

// if ajax load of question, return values now
if (isset($_POST['ajax'])) {
    $out = array(
        'state' => JWT::encode($a2->getState(), $statesecret),
        'disp' => $disp
    );
    echo json_encode($out);
    exit;
}

if (isset($_GET['frame_id'])) {
    $frameid = preg_replace('/[^\w:.-]/', '', $_GET['frame_id']);
} else {
    $frameid = "embedq2-" . $qsid;
}
if (isset($_GET['theme'])) {
    $theme = preg_replace('/\W/', '', $_GET['theme']);
    $_SESSION['coursetheme'] = $theme . '.css';
}

$lastupdate = '20200422';
$placeinhead = '';
$placeinhead .= '<link rel="stylesheet" type="text/css" href="' . $imasroot . '/assess2/vue/css/index.css?v=' . $lastupdate . '" />';
$placeinhead .= '<link rel="stylesheet" type="text/css" href="' . $imasroot . '/assess2/vue/css/chunk-common.css?v=' . $lastupdate . '" />';
$placeinhead .= '<link rel="stylesheet" type="text/css" href="' . $imasroot . '/assess2/print.css?v=' . $lastupdate . '" media="print">';
$placeinhead .= '<script src="' . $imasroot . '/mathquill/mathquill.min.js?v=022720" type="text/javascript"></script>';
if (!empty($CFG['assess2-use-vue-dev'])) {
    $placeinhead .= '<script src="' . $imasroot . '/javascript/drawing.js?v=041920" type="text/javascript"></script>';
    $placeinhead .= '<script src="' . $imasroot . '/javascript/AMhelpers2.js?v=052120" type="text/javascript"></script>';
    $placeinhead .= '<script src="' . $imasroot . '/javascript/eqntips.js?v=041920" type="text/javascript"></script>';
    $placeinhead .= '<script src="' . $imasroot . '/javascript/mathjs.js?v=041920" type="text/javascript"></script>';
    $placeinhead .= '<script src="' . $imasroot . '/mathquill/AMtoMQ.js?v=052120" type="text/javascript"></script>';
    $placeinhead .= '<script src="' . $imasroot . '/mathquill/mqeditor.js?v=041920" type="text/javascript"></script>';
    $placeinhead .= '<script src="' . $imasroot . '/mathquill/mqedlayout.js?v=041920" type="text/javascript"></script>';
} else {
    $placeinhead .= '<script src="' . $imasroot . '/javascript/assess2_min.js?v=1" type="text/javascript"></script>';
}
$placeinhead .= '<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.contentWindow.js" integrity="sha512-RMBWitJB1ymY4l6xeYsFwoEgVCAnOWX/zL1gNwXjlUj78nZ8SVbJsZxbH/w0p2jDNraHkOW8rzQgcJ0LNSXWBA==" crossorigin="anonymous"></script>';
$placeinhead .= '<script src="' . $imasroot . '/javascript/assess2supp.js?v=' . rand(1, 10000) . '"  type="text/javascript"></script>';
$placeinhead .= '<link rel="stylesheet" type="text/css" href="' . $imasroot . '/mathquill/mathquill-basic.css">
  <link rel="stylesheet" type="text/css" href="' . $imasroot . '/mathquill/mqeditor.css">';


/** ADAPT */
$placeinhead .= '<script src="' . $imasroot . '/adapt/assess2sup.js?v=' . rand(1, 100000) . '" type="text/javascript"></script>';
$placeinhead .= '<style>
.button-primary:not(:hover) {
    background-color: #0058E6 !important;
}
.button-primary {
    padding: .25rem .5rem;
    border-radius: .2rem;
}
.button-primary {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}
.button-primary {
        display: inline-block;
        font-weight: 400;
        line-height: 1.5;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
.questionpane {
    margin: 0;
    font-family: var(--bs-font-sans-serif);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}
</style>';

// setup resize message sender
$placeinhead .= '<script type="text/javascript">
  var frame_id = "' . $frameid . '";
  var qsid = ' . $qsid . ';
  var thisqn = ' . $qn . ';
  function sendresizemsg() {
   if(inIframe()){
      var default_height = Math.max(
        document.body.scrollHeight, document.body.offsetHeight) + 20;
      var wrap_height = default_height - document.getElementById("embedspacer").offsetHeight;
      window.parent.postMessage( JSON.stringify({
        subject: "lti.frameResize",
        height: default_height,
        wrapheight: wrap_height,
        iframe_resize_id: "' . $frameid . '",
        element_id: "' . $frameid . '",
        frame_id: "' . $frameid . '"
      }), "*");
   }
  }
  $(function() {
      $(document).on("mqeditor:show", function() {
        $("#embedspacer").show();
        sendresizemsg();
      });
      $(document).on("mqeditor:hide", function() {
        $("#embedspacer").hide();
        sendresizemsg();
      });
    });
  if (mathRenderer == "Katex") {
     window.katexDoneCallback = sendresizemsg;
  } else if (typeof MathJax != "undefined") {
      MathJax.Hub.Queue(function () {
          sendresizemsg();
      });
  } else {
      $(function() {
          sendresizemsg();
      });
  }
  </script>
  <style>
  body { margin: 0;}
  .question {
      margin-top: 0 !important;
  }
  .questionpane {
    margin-top: 0 !important;
    }
  .questionpane>.question {
  	background-image: none !important;
  }
  #mqe-fb-spacer {
      height: 0 !important;
  }
  </style>';
if ($_SESSION['mathdisp'] == 1 || $_SESSION['mathdisp'] == 3) {
    //in case MathJax isn't loaded yet
    $placeinhead .= '<script type="text/x-mathjax-config">
      MathJax.Hub.Queue(function () {
          sendresizemsg();
      });
  </script>';
}
$flexwidth = true; //tells header to use non _fw stylesheet
$nologo = true;
require __DIR__ . "/../header.php";
echo '<div><ul id="errorslist" style="display:none" class="small"></ul></div>';
echo '<div class="questionwrap">';
if (!$state['jssubmit']) {
    echo '<div id="results' . $qn . '"></div>';
}
echo '<div class="questionpane">';
echo '<div class="question" id="questionwrap' . $qn . '">';
echo '</div></div>';
if (!$state['jssubmit']) {
    echo '<p>';
    echo '<button type=button onclick="adaptSubmitq(' . $qn . ')" class="primary">' . _("Submit") . '</button>';
    if ($state['allowregen']) {
        echo ' <button type=button onclick="regenq(' . $qn . ')" class="secondary">' . _('Try a similar question') . '</button>';
    }
    echo '</p>';
}
echo '</div>';
echo '<input type=hidden name=toscoreqn id=toscoreqn value=""/>';
echo '<input type=hidden name=state id=state value="' . Sanitize::encodeStringForDisplay(JWT::encode($a2->getState(), $statesecret)) . '" />';
echo '<input type=hidden name=problemJWT id=problemJWT value="' . $_REQUEST['problemJWT'] . '" />';
echo '<input type=hidden name=url  value="' . $url . '" />';


echo '<script>
    $(function() {
        showandinit(' . $qn . ',' . json_encode($disp) . ');
      updateCSS(' . json_encode($raw) . ', ' . ($is_conditional_question ? 'true' : 'false') . ');
    });
 window.addEventListener("message", event => {
     if (typeof event.data !== "string") {
      let message;
      try {
        message = JSON.parse(event.data);
        if (message.raw){
          updateCSS(message.raw, ' . ($is_conditional_question ? 'true' : 'false') . ');
        }
        console.log(message)
      }
      catch (e) {

      }
        return;
      }
      })
    </script>';

if ($state['jssubmit']) {
    echo '<div id="embedspacer" style="display:none;height:200px">&nbsp;</div>';
} else {
    echo '<div id="embedspacer" style="display:none;height:150px">&nbsp;</div>';
}


$placeinfooter = '<div id="ehdd" class="ehdd" style="display:none;">
  <span id="ehddtext"></span>
  <span onclick="showeh(curehdd);" style="cursor:pointer;">' . _('[more..]') . '</span>
</div>
<div id="eh" class="eh"></div>';
require __DIR__ . "/../footer.php";
