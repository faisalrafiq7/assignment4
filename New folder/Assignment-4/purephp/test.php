<?php 

require "dbhphp.php";
$postId = 38;
$query = 'SELECT * FROM posts WHERE ID = '.$postId;

// Get Result
if (!mysqli_query($conn, $query)) {
    echo("Error description: " . mysqli_error($conn));
}
$result = mysqli_query($conn, $query);

// Fetch Data
$thePost = mysqli_fetch_all($result, MYSQLI_ASSOC);
//echo "<script> console.log('.$posts.')</script>"

echo json_encode($thePost);