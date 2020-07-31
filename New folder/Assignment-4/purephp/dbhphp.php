<?php

$dbservername = "localhost";
$dbusername = "root";
$dbpassword = "faisal12345";
$dbname = "assignment4";

$conn = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname); 

if(!$conn){
    die("Connection Failed: ".mysqli_connect_error());
}