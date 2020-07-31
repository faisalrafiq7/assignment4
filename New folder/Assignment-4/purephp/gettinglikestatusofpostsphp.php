<?php
require 'dbhphp.php';
session_start();
$postID = $_POST['postID'];
$byUser = $_SESSION['username'];

$query = "SELECT likeStatus FROM likestatus WHERE postID='$postID' AND byUser= '$byUser'"; 
$result = mysqli_query($conn, $query);
if(!$result){
    echo 'Error in result: '. mysqli_error($conn); 
}else{
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    if(!$rows){
        echo 'No recorded status by this user'. mysqli_error($conn);
    }else{
        echo json_encode($rows[0]['likeStatus']);
    }
    
}

