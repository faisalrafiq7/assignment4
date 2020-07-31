<?php
 session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Forum- Log in or Sign Up</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/all.css">
    <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet"> 
    <!-- font-family: 'Acme', sans-serif; topic head -->
    <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">
    <!-- font-family: 'Special Elite', cursive; topic body-->
    <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet">
    <!-- font-family: 'Caveat', cursive; comment body -->
    <link href="https://fonts.googleapis.com/css2?family=Crete+Round&display=swap" rel="stylesheet">
    <!-- font-family: 'Crete Round', serif; header welcome -->
</head>
<body>
    <header>
    <nav>
    <?php
        
        if(isset($_SESSION['fname'])){
            echo '<p class="welcomeText">Hi There '.$_SESSION['fname'].'</p>';
            if($_SESSION['userType'] == 'User'){
                // echo '<form action="purephp/logoutphp.php" method="post">
                // <button type="submit" name="logout-submit">Log Out</button>
                // </form>';
                echo '<div class="logoutbuttoncontainer">
                <div class="userTypeInfo">User</div>
                <form action="purephp/logoutphp.php" method="post">
                    <button type="submit" name="logout-submit">Log Out</button>
                </form>
                </div>';
            }else if($_SESSION['userType'] == 'Admin'){
                echo '<div class="logoutbuttoncontainer">
                <div class="userTypeInfo">Admin</div>
                <div class= "usernameDiv invisible">'.$_SESSION['username'].'</div>
                <form action="purephp/logoutphp.php" method="post">
                    <button type="submit" name="logout-submit">Log Out</button>
                </form>
                </div>';
            }
            
        }else{
            echo '<p class="welcomeText">Welcome To The Forum </p>';
            echo '<form action="purephp/loginphp.php" method="post">
            <input type="text" name="username-email" placeholder="Username/Email">
            <input type="password" name="password" placeholder="Password">
            <button type="submit" name="login-submit">Log In</button>
            </form>';
        }
    
    ?>
    
    

    </nav>
    </header>