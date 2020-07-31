<?php
    require "header.php";
?>

<main>
<form action="purephp/signupphp.php" method="post">
    <section class="signupform">
        <div class="alert">
            <?php
                if(isset($_GET['error'])){
                    if($_GET['error'] == 'emptyfields'){
                        echo '<p class="alert-red">Empty Fields!</p>';
                    }else if($_GET['error'] == 'invalidemailandusername'){
                        echo '<p class="alert-red">Invalid Email And Username!</p>';
                    }else if($_GET['error'] == 'invalidemail'){
                        echo '<p class="alert-red">Invalid Email!</p>';
                    }else if($_GET['error'] == 'invalidusername'){
                        echo '<p class="alert-red">Invalid Username!</p>';
                    }else if($_GET['error'] == 'nopwdmatch'){
                        echo '<p class="alert-red">Passwords Do Not Match!</p>';
                    }else if($_GET['error'] == 'usernametaken'){
                        echo '<p class="alert-red">Username Not Available!</p>';
                    }else if($_GET['error'] == 'nouser'){
                        echo '<p class="alert-red">Wrong Credentials!</p>';
                    }else if($_GET['error'] == 'wrongpassword'){
                        echo '<p class="alert-red">Wrong Username or Passwrod!</p>';
                    } 
                }else if (isset($_GET['signup'])){
                    if($_GET['signup'] == 'success'){
                    echo '<p class="alert-green">You have successfully signed up!</p>';
                    }
                }
            ?>
        </div>
        <div class="signupHeader">
            <h2>Sign Up</h2>
        </div>
        <div class=text-inputs>
            <input type="text" name="firstName" placeholder="First Name" value=<?php echo isset($_GET['firstName']) ? $_GET['firstName'] : '';?>>
            <input type="text" name="lastName" placeholder="Last Name" value=<?php echo isset($_GET['lastName']) ? $_GET['lastName'] : '';?>>
            <input type="text" name="username" placeholder="Username" value=<?php echo isset($_GET['username']) ? $_GET['username'] : '';?>>
            <input type="text" name="email" placeholder="Email" value=<?php echo isset($_GET['email']) ? $_GET['email'] : '';?>>
            <input type="password" name="pwd" placeholder="Password">
            <input type="password" name="pwd-repeat" placeholder="Repeat Password">
        </div>
        <div class="dob-input">
            <label for="dob">Date Of Birth</label>
            <input type="date" name="dob" id="dob" value=<?php echo isset($_GET['dob']) ? $_GET['dob'] : '';?>>
        </div>
        <div>
            <!-- <label for="gender-input">Gender</label> -->
            <div class="gender-input" id="gender-input">
                <div>
                    <input type="radio" id="male" name="gender" value="male">
                    <label for="male">Male</label>
                </div>
                <div> 
                    <input type="radio" id="female" name="gender" value="female">
                    <label for="female">Female</label>
                </div>
                <div>
                    <input type="radio" id="other" name="gender" value="other">
                    <label for="other">Other</label> 
                </div>   
            </div>
        </div>
        <div>
            <!-- <label for="userType">User Type</label> -->
            <div  class="userType" id="userType">
                <div>
                    <input type="radio" id="admin" name="Utype" value="Admin">
                    <label for="admin">Admin</label>
                </div>
                <div> 
                    <input type="radio" id="user" name="Utype" value="user">
                    <label for="user">User</label>
                </div> 
            </div>
        </div>
        <div>
            <button type="submit" name="signup-submit">Sign Up</button>
        </div>
    </section>
</form>
</main>


<?php
    require "footer.php";
?>
