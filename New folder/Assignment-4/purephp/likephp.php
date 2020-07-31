<?php
require 'dbhphp.php';
//receive the postid make a query to check if the row has been inserted to the likes table.... if yes update the like status there and if no, insert a row
$postID = $_POST['postID'];
session_start();
$byUser = $_SESSION['username'];
$query = "SELECT * FROM likestatus WHERE postID = '$postID' AND byUser= '$byUser'";
$result = mysqli_query($conn, $query);

if(!$result){
    echo 'Error in result: '. mysqli_error($conn); 
}else{
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo 'count rows is: '.count($rows);
    if(count($rows) == 0){
        //insert data
        $sql = "INSERT INTO likestatus (postID, likeStatus, byUser) VALUES('$postID', '1', '$byUser')";
        $result = mysqli_query($conn, $sql);
    }else if(count($rows) == 1){
        //update data
        //check for the value of the likestatus and accordingy write an sql statement
        $sql = "SELECT likeStatus FROM likestatus WHERE postID = '$postID' AND byUser= '$byUser'";
        $result = mysqli_query($conn, $query);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC); 
        echo json_encode($data[0]['likeStatus']);
        if($data[0]['likeStatus']==0){
            $sql = "UPDATE likestatus SET likeStatus= '1' WHERE postID = '$postID' AND byUser= '$byUser'";
            $result = mysqli_query($conn, $sql);
        }else if($data[0]['likeStatus'] == -1){
            $sql = "UPDATE likestatus SET likeStatus= '1' WHERE postID = '$postID' AND byUser= '$byUser'";
            $result = mysqli_query($conn, $sql);
        }else if($data[0]['likeStatus'] == 1){
            //unliking the post
            $sql = "UPDATE likestatus SET likeStatus= '0' WHERE postID = '$postID' AND byUser= '$byUser'";
            $result = mysqli_query($conn, $sql);
        }
    }
}
