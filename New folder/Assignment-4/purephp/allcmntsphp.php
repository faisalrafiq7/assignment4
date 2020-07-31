<?php
$postID = $_POST['postID'];

require "dbhphp.php";

$query = 'SELECT * FROM comments WHERE postID='.$postID.' ORDER BY cmntID DESC'; //will order newest first

// Get Result
$result = mysqli_query($conn, $query);

if($result){
    // Fetch Data
    $cmnts = mysqli_fetch_all($result, MYSQLI_ASSOC); 
    echo json_encode($cmnts);

}else{
    echo 'Empty';
}




