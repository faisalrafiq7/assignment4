<?php
require 'dbhphp.php';
$postID= $_POST['postID']; 

$query = "DELETE FROM posts WHERE ID = '$postID'";
$result = mysqli_query($conn, $query);
if(!$result){
    echo 'Error in result: '. mysqli_error($conn); 
}else{
    echo 'Success';
}