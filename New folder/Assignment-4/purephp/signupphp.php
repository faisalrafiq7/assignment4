<?php
//check for legitimate arrival to this page
if(isset($_POST['signup-submit'])){

    require "dbhphp.php";

    $fname = ucfirst($_POST['firstName']);
    $lname = ucfirst($_POST['lastName']);
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['pwd'];
    $passwordRepeat = $_POST['pwd-repeat'];
    $dob = $_POST['dob'];
    $gender = $_POST['gender'];
    $userType  = $_POST['Utype'];
    if(empty($fname) || empty($lname) || empty($username) || empty($email) || empty($password) || empty($dob) || empty($gender) || empty($userType)){
        header("Location: ../index.php?error=emptyfields&firstName=".$fname."&lastName=".$lname."&email=".$email."&username=".$username."&dob=".$dob."&gender=".$gender);
        exit();
    }
    //checking for invalid email and username
    else if(!filter_var($email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/",$username)){
        header("Location: ../index.php?error=invalidemailandusername&firstName=".$fname."&lastName=".$lname."&dob=".$dob."&gender=".$gender);
        exit();
    }
    //checking for only email
    else if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        header("Location: ../index.php?error=invalidemail&firstName=".$fname."&lastName=".$lname."&username=".$username."&dob=".$dob."&gender=".$gender);
        exit();
    }
    //checking for only username
    else if(!preg_match("/^[a-zA-Z0-9]*$/",$username)){
        header("Location: ../index.php?error=invalidusername&firstName=".$fname."&lastName=".$lname."&email=".$email."&dob=".$dob."&gender=".$gender);
        exit();
    }
    //checking if passwords dont match
    else if ($passwordRepeat !== $password){
        header("Location: ../index.php?error=nopwdmatch&firstName=".$fname."&lastName=".$lname."&email=".$email."&username=".$username."&dob=".$dob."&gender=".$gender);
        exit();
    }else{
        //Checking for username availability
        $sql = "SELECT username FROM userinfo WHERE username=?";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../index.php?error=sqlstmterror");
            exit();
        }else{
            mysqli_stmt_bind_param($stmt,'s',$username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultUsername= mysqli_stmt_num_rows($stmt);
            if($resultUsername>0){
                header("Location: ../index.php?error=usernametaken&firstName=".$fname."&lastName=".$lname."&email=".$email."&dob=".$dob."&gender=".$gender);
                exit(); 
            }//signing up the user now as all the errors have been bypassed
            else{
                // echo "here";
                $sql = "INSERT INTO userinfo (username, firstName, lastName, email, gender, dob, userType , pwd) VALUES (?,?,?,?,?,?,?,?)";
                $stmt = mysqli_stmt_init($conn);
                if(!mysqli_stmt_prepare($stmt, $sql)){
                    header("Location: ../index.php?error=sqlstmterror");
                    exit();
                }else{
                    $pwdHash = password_hash($password, PASSWORD_DEFAULT);
                    if($gender == "male"){
                        $genderInChar = 'm';
                    }else if($gender == "female"){
                        $genderInChar = 'f';
                    }else if($gender == "other"){
                        $genderInChar = 'o';
                    }
                    mysqli_stmt_bind_param($stmt,'ssssssss',$username,$fname,$lname,$email,$genderInChar,$dob,$userType,$pwdHash);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../index.php?signup=success");
                    exit();
                }
            }
        }
    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}else{
    header("Location: ../index.php?error=tresspassing");
    exit();
}

