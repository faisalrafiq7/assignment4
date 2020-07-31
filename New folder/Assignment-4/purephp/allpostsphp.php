<?php 

require "dbhphp.php";

$query = 'SELECT * FROM posts ORDER BY ID DESC'; //will order newest first


// Get Result
$result = mysqli_query($conn, $query);

if($result){
    // Fetch Data
    $posts = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if(!$posts){
        echo "<p>'No description'</p>";
        
        } else {
            echo json_encode($posts);
        }

}else{
    echo 'Empty';
}
