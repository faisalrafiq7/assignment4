<?php 

require "dbhphp.php";
$postId = $_POST['id'];
$query = 'SELECT * FROM posts WHERE ID = '.$postId;

// Get Result
// if (!mysqli_query($conn, $query)) {
//     echo("Error description: " . mysqli_error($conn));
// }
$result = mysqli_query($conn, $query);

// Fetch Data
$thePost = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($thePost);

