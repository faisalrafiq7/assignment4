<?php
require 'dbhphp.php';

if(isset($_POST['editpostBody']) && isset($_POST['editpostTopic'])){
    $topicOfPost = $_POST['editpostTopic'];
    $bodyOfPost = $_POST['editpostBody'];
    $postID = $_POST['editpostID'];

    //checking for empty fields
    if(empty($topicOfPost) && empty($bodyOfPost)){
        header ("Location: ../forum.php?error=emptyfields");
        exit();
    } else if(empty($topicOfPost)){
        header ("Location: ../forum.php?error=emptyfields&editpostBody=".$bodyOfPost);
        exit(); 
    } else if(empty($bodyOfPost)){
        header ("Location: ../forum.php?error=emptyfields&editpostTopic=".$topicOfPost);
        exit(); 
    } else{
        $sql = "UPDATE posts SET topic=?, body=?, editedByUser= ?, edited='1' WHERE ID='$postID'";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            echo "ERROR: " . mysqli_error($conn);
            header ("Location: ../forum.php?error=editpostsqlstmterror");
            exit();
        }else{
            session_start();
            mysqli_stmt_bind_param($stmt, "sss", $topicOfPost, $bodyOfPost, $_SESSION['username']);
            mysqli_stmt_execute($stmt);
            // header ("Location: ../forum.php?post=success");
            // exit();
        }
     }

} else{
    header ("Location: ../forum.php?error=trespassing");
    exit();
}   