<?php
require 'dbhphp.php';
$postID = $_POST['postID'];


$query = "SELECT * FROM likestatus WHERE (postID='$postID' AND likeStatus = '-1')";
$result = mysqli_query($conn, $query);
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
if(!$rows){
    echo '0';
}else{
    echo json_encode(count($rows));
}

