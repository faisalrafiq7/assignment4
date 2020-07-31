<?php
require 'dbhphp.php';
$cmntID= $_POST['cmntID']; 

$query = "DELETE FROM comments WHERE cmntID = '$cmntID'";
$result = mysqli_query($conn, $query);
if(!$result){
    echo 'Error in result: '. mysqli_error($conn); 
}else{
    echo 'Success';
}