<?php
require 'dbhphp.php';

if(isset($_POST['postBody']) && isset($_POST['postTopic'])){
    $topicOfPost = $_POST['postTopic'];
    $bodyOfPost = $_POST['postBody'];

    //adding the post to the table

    //checking for empty fields
    if(empty($topicOfPost) && empty($bodyOfPost)){
        header ("Location: ../forum.php?error=emptyfields");
        exit();
    } else if(empty($topicOfPost)){
        header ("Location: ../forum.php?error=emptyfields&postBody=".$bodyOfPost);
        exit(); 
    } else if(empty($bodyOfPost)){
        header ("Location: ../forum.php?error=emptyfields&postTopic=".$topicOfPost);
        exit(); 
    } else{
        //no field is empty
        $sql = "INSERT INTO posts(topic, body, byUser) VALUES (?,?,?)";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header ("Location: ../forum.php?error=newpostsqlstmterror");
            exit();
        }else{
            session_start();
            mysqli_stmt_bind_param($stmt, "sss", $topicOfPost, $bodyOfPost, $_SESSION['username']);
            mysqli_stmt_execute($stmt);
            // header ("Location: ../forum.php?post=success");
            // exit();
        }

    }
}else{
    header ("Location: ../forum.php?error=trespassing");
    exit();
}