<?php
require 'dbhphp.php';

session_start();

$commentBody = $_POST['commentBody'];
$postID = $_POST['postID'];
$byUser = $_SESSION['username'];


$sql= "INSERT INTO  comments (postID, cmntBody, byUser) VALUES('$postID', '$commentBody', '$byUser')";

if (mysqli_query($conn, $sql)) {
    echo "Data Insert is successfully";
} else {
    echo "Error inserting data: " . mysqli_error($conn);    
}
