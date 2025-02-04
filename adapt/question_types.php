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
ini_set('memory_limit', '4G');
error_reporting(E_ALL);

require __DIR__ . "/../init_without_validate.php";
require($_SERVER['DOCUMENT_ROOT'] . '/../adapt_config.php');
$headers = getallheaders();
/*if (!isset($headers['Authorization'])) {
 //   echo json_encode(['type' => 'error', 'message' => 'Missing authorization header in IMathAS request']);
    exit;
} else {
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    if ($token !== $adapt_imathas_token) {
        echo json_encode(['error' => "$token is not the adapt_imathas_token"]);
        exit;
    }

    try {*/
$id = 0;
if (isset($_GET['id'])) {
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT,
        ['options' => ['min_range' => 1]]);

}
if ($id) {
    $stmt = $DBH->prepare('SELECT `qtype`, `control` FROM `imas_questionset` WHERE `id` = ?;');
    $stmt->execute(array($id));
    $results = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(['type' => 'success', 'question_type' => $results[0]]);
    exit;
} else {
    $sql = "SELECT `id`,`qtype`,`control` FROM `imas_questionset`;";
    $stmt = $DBH->query($sql);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
echo json_encode(['type' => 'success', 'question_types' => $results]);

/*  } catch (Exception $e) {
      echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
/*   }
}

