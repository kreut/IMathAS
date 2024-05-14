<?php
require_once "../includes/sanitize.php";


require_once "../init_without_validate.php";
require __DIR__ . '/../vendor/autoload.php';
require(__DIR__ . '/JWE.php');
$JWE = new JWE();
$assessver = 2;
$courseUIver = 2;
$assessUIver = 2;
$_SESSION = array();
$issigned = false;
$inline_choicemap = !empty($CFG['GEN']['choicesalt']) ? $CFG['GEN']['choicesalt'] : 'test';
$statesecret = !empty($CFG['GEN']['embedsecret']) ? $CFG['GEN']['embedsecret'] : 'test';
$cid = 'embedq';
$_SESSION['secsalt'] = "12345";
$myrights = 5;

if (!isset($_REQUEST['problemJWT'])) {
    echo "This page requires a JWT";
    exit;
}
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
/*
if (!empty($QS['auth'])) {
    $issigned = true;
} else {
    echo "JWT must be signed";
    exit;
}
*/

if (empty($QS['includeans'])) {
    echo "JWT must have includeans set";
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
if (!empty($_COOKIE["embedq2userprefs"])) {
    $prefcookie = json_decode($_COOKIE["embedq2userprefs"], true);
}
$_SESSION['userprefs'] = array();
foreach ($prefdefaults as $key => $def) {
    if (isset($QS[$key])) { // can overwrite via JWT
        $_SESSION['userprefs'][$key] = filter_var($QS[$key], FILTER_SANITIZE_NUMBER_INT);
    } else if (!empty($prefcookie) && isset($prefcookie[$key])) {
        $_SESSION['userprefs'][$key] = filter_var($prefcookie[$key], FILTER_SANITIZE_NUMBER_INT);
    } else {
        $_SESSION['userprefs'][$key] = $def;
    }
}
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
if (isset($QS['seed'])) {
    $seed = intval($QS['seed'])%10000;
} else {
    $seed = rand(0, 9999);
}
if (!$issigned) {
    $seed += 10000;
}
$_SESSION['coursetheme'] = $coursetheme;

$flexwidth = true;
$isdiag = false;
$useeqnhelper = false;
$useeditor = 0;
$isfw = false;
$placeinhead = '<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.contentWindow.js" integrity="sha512-RMBWitJB1ymY4l6xeYsFwoEgVCAnOWX/zL1gNwXjlUj78nZ8SVbJsZxbH/w0p2jDNraHkOW8rzQgcJ0LNSXWBA==" crossorigin="anonymous"></script>';
require_once "../header.php";

require_once '../assess2/AssessStandalone.php';

$assessver = 2;
$courseUIver = 2;
$assessUIver = 2;
$qn = 5; //question number to use
// load question data and load/set state

$stm = $DBH->prepare("SELECT * FROM imas_questionset WHERE id=:id");
$stm->execute(array(':id' => $QS['id']));

$line = $stm->fetch(PDO::FETCH_ASSOC);

$line['solutionopts'] = ($line['solutionopts']|1); // hide "this soln is for a similar problem"

$a2 = new AssessStandalone($DBH);
$a2->setQuestionData($line['id'], $line);
$state = array(
    'seeds' => array($qn => $seed),
    'qsid' => array($qn => $qsid),
    'stuanswers' => array(),
    'stuanswersval' => array(),
    'scorenonzero' => array(($qn + 1) => false),
    'scoreiscorrect' => array(($qn + 1) => false),
    'partattemptn' => array($qn => array()),
    'rawscores' => array($qn => array()),
    'includeans' => true
);
$a2->setState($state);
$disp = $a2->displayQuestion($qn, [
    'showallparts' => true,
    'showans' => false,
    'hideans' => true,
    'showhints' => 0,
    'includeans' => true
]);

// unwrap written example div
$disp['soln'] = preg_replace('/^<div.*?>(.*?)<\/div>$/','$1', $disp['soln']);

echo printfilter(filter($disp['soln']), false);

require_once "../footer.php";

?>
