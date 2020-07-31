<?php
    if(isset($_POST["login-submit"])){
        
        require "dbhphp.php";

        $uid = $_POST['username-email'];    //username or password
        $password = $_POST['password'];

        if(empty($uid) || empty($password)){
            header('Location: ../index.php?error=emptyfields');
            exit();
        }else{
            $sql = "SELECT * FROM userinfo WHERE username=? OR email=?";  //check for a possible semicolon here if it shows an error
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)){
                header('Location: ../index.php?error=sqlerror1');
                exit();
            }else{
                mysqli_stmt_bind_param($stmt ,'ss', $uid, $uid );
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                //checking if we did any data from the query
                if($row = mysqli_fetch_assoc($result)){
                    //we have a match of a username/email
                    //checking the password
                    $pwdCheck = password_verify($password, $row['pwd']);
                    if($pwdCheck == true){
                        //login success
                        session_start();
                        $_SESSION['ID'] = $row['ID'];
                        $_SESSION['username'] = $row['username'];
                        $_SESSION['fname'] = $row['firstName'];
                        $_SESSION['userType'] = $row['userType'];

                        header('Location: ../forum.php?login=success');
                        exit();
                    }else{
                        //wrong password
                        header('Location: ../index.php?error=wrongpassword');
                        exit();
                    }
                }else{
                    header('Location: ../index.php?error=nouser');
                    exit();
                }
            }
        }
    }else{
        header('Location: ../index.php?error=tresspassing');
        exit();
    }
?>
