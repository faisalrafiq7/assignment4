<?php
    require 'purephp/dbhphp.php';
    
    $sql = "CREATE TABLE cmntsFor(
        cmntID int(11) AUTO_INCREMENT PRIMARY_KEY NOT NULL,
        postID int(11) NOT NULL,
        cmntBody LONGTEXT NOT NULL,
        byUser TINYTEXT NOT NULL
    )";

    if (mysqli_query($conn, $sql)) {
        echo "Comment Table created successfully";
        
    } else {
        echo "Error creating table: " . mysqli_error($conn);
        header("Location: ../index.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    helllllllloooooooooo;
</body>
</html>