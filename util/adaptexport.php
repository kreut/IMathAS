<?php
//Create question libraries based on a course
//IMathAS (c) 2018 David Lippman for Lumen Learning

require "../init.php";

function flattenitems($items, &$addto)
{
    global $itemsimporder;
    foreach ($items as $item) {
        if (is_array($item)) {
            flattenitems($item['items'], $addto);
        } else {
            $addto[] = $item;
        }
    }
}


// restrict to teachers only
// we'll check for ownership later
if ($myrights < 40) {
    exit;
}

if (!isset($_POST['cid'])) {
    require "../header.php";
    ?>
    <h1>Export CSV Question IDs for ADAPT</h1>
    <form method="post">
        <p><label>Course ID: <input type=number name=cid></label></p>
        <p><label>Public: <select name=public>
                    <option value="y">Yes</option>
                    <option value="n">No</option>
                </select></label></p>
        <p><label>Folder Names: <select name=folder>
                    <option value="course">One folder with Course Name</option>
                    <option value="assn">One folder for each Assessment</option>
                </select></label></p>
        <p><label>Assignment Column: <select name=assncol>
                    <option value="n">No, don't include</option>
                    <option value="y">Yes, include</option>
                </select></label></p>
        <p><label>Duplicate Question IDs in different assessments:
                <select name=dups>
                    <option value="n">No duplicates</option>
                    <option value="y">Include duplicates</option>
                </select></label></p>
        <button type=submit>Generate</button>
    </form>
    <?php
    require "../footer.php";
} else {
    $cid = intval($_POST['cid']);
    $foldertype = $_POST['folder'];
    $assncol = $_POST['assncol'];

    // start CSV data array
    $csv = array();
    if ($assncol == 'n') {
        $headerrow = ["Question Type*",
            "Public*",
            'Folder*',
            "Title*",
            "Source",
            "Auto-Graded Technology",
            "Technology ID/File Path",
            "Author",
            "License",
            "License Version",
            "Tags",
            "Text Question",
            "Answer",
            "Solution",
            "Hint"
        ];
    } else {
        $headerrow = ["Question Type*",
            "Public*",
            'Folder*',
            "Title*",
            'Assignment',
            "Template",
            'Topic',
            "Source",
            "Auto-Graded Technology",
            "Technology ID/File Path",
            "Author",
            "License",
            "License Version",
            "Tags",
            "Text Question",
            "Answer",
            "Solution",
            "Hint"
        ];
    }
    $csv[] = $headerrow;

    // get all question data
    $stm = $DBH->prepare("SELECT iq.id,iq.questionsetid,iqs.description FROM imas_questions AS iq
        JOIN imas_questionset AS iqs ON iq.questionsetid=iqs.id
        JOIN imas_assessments AS ia ON iq.assessmentid=ia.id
        WHERE ia.courseid=?");
    $stm->execute([$cid]);
    $qdata = [];
    while ($row = $stm->fetch(PDO::FETCH_ASSOC)) {
        $qdata[$row['id']] = $row;
    }

    // get assessment question order
    $assessnames = [];
    $stm = $DBH->prepare("SELECT id,itemorder,name FROM imas_assessments WHERE courseid=?");
    $stm->execute([$cid]);
    $adata = [];
    while ($row = $stm->fetch(PDO::FETCH_ASSOC)) {
        $adata[$row['id']] = [];
        $order = explode(',', $row['itemorder']);
        foreach ($order as $k => $v) {
            $sub = explode('~', $v);
            foreach ($sub as $sv) {
                if (strpos($sv, '|') !== false) {
                    continue;
                }
                $adata[$row['id']][] = $sv;
            }
        }
        $assessnames[$row['id']] = $row['name'];
    }

    // get course item order
    $stm = $DBH->prepare("SELECT itemorder,name,ownerid FROM imas_courses WHERE id=?");
    $stm->execute([$cid]);
    $row = $stm->fetch(PDO::FETCH_ASSOC);
    // check for ownership. Admins can export anything, but
    // we're not going to bother with handling group admins
    if ($myrights < 100 && $userid != $row['ownerid']) {
        if (intval($userid) !== 34) { //Eric's ID
            echo 'You can only export your own courses';
            exit;
        }
    }
    $itemorder = unserialize($row['itemorder']);
    $coursename = $row['name'];
    $itemsimporder = array();
    flattenitems($itemorder, $itemsimporder);

    $itemsassoc = array();
    $stm = $DBH->prepare("SELECT id,typeid FROM imas_items WHERE courseid=? AND itemtype='Assessment'");
    $stm->execute([$cid]);
    while ($row = $stm->fetch(PDO::FETCH_NUM)) {
        $itemsassoc[$row[0]] = $row[1];
    }

    // go through course, add items
    $addedqsids = array();
    foreach ($itemsimporder as $itemid) {
        if (!isset($itemsassoc[$itemid])) {
            continue;
        }
        $aid = $itemsassoc[$itemid];
        $qids = $adata[$aid];
        foreach ($qids as $qid) {
            if ($_POST['dups'] !== 'y' && in_array($qdata[$qid]['questionsetid'], $addedqsids)) {
                continue;
            }
            $outrow = [];
            $outrow[] = 'assessment';
            $outrow[] = ($_POST['public'] == 'n') ? 0 : 1;
            $outrow[] = ($foldertype == 'course') ? $coursename : $assessnames[$aid];
            $outrow[] = $qdata[$qid]['description'];
            if ($assncol == 'y') {
                $outrow[] = $assessnames[$aid];
                $outrow[] = '';
                $outrow[] = ''; //template
            }
            $outrow[] = ''; //source
            $outrow[] = 'imathas';
            $outrow[] = $qdata[$qid]['questionsetid'];
            //add in the remaining columns
            if (!isset($missing_row_count)) {
                $missing_row_count = count($headerrow) - count($outrow);
            }
            for ($i = 0; $i < $missing_row_count; $i++) {
                $outrow[] = '';
            }
            $csv[] = $outrow;

            $addedqsids[] = $qdata[$qid]['questionsetid'];
        }
    }

    header('Content-type: text/csv');
    header("Content-Disposition: attachment; filename=\"adaptexport-$cid.csv\"");
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');

    $out = fopen('php://output', 'w');
    foreach ($csv as $row) {
        fputcsv($out, $row);
    }
    fclose($out);
}
